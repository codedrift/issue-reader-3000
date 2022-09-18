import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Octokit } from "@octokit/core";
import { Issue, Repository } from "@octokit/graphql-schema";
import * as NodeCache from "node-cache";
import { mapToCustomIssue, mapToCustomIssueDetail } from "./mapper";
import { CustomIssue, CustomIssueDetail } from "./models/issue.model";
@Injectable()
export class GithubApiClientService {
  private octokit: Octokit;
  private responseCache = new NodeCache({
    stdTTL: 600,
  });
  private logger = new Logger(GithubApiClientService.name);

  constructor(readonly configService: ConfigService) {
    const token = configService.get<string>("GH_TOKEN");
    this.octokit = new Octokit({ auth: token });
  }

  async getIssueById(owner: string, repository: string, number: number): Promise<CustomIssueDetail> {
    this.logger.debug("Fetch issue", {
      repository,
      owner,
      number,
    });

    const requestKey = `${owner}/${repository}/${number}`;

    if (this.responseCache.has(requestKey)) {
      return mapToCustomIssueDetail(this.responseCache.get<Issue>(requestKey));
    }

    //TODO: syntax highlighting
    const query = `
    query repoIssueDetail($owner: String!, $repository: String!, $number: Int!) {
      repository(name: $repository, owner: $owner) {
        issue(number: $number) {
            author {
              avatarUrl
              ... on User {
                name
                email
                login
              }
            }  
            id
            title
            bodyHTML
            createdAt
            closed
            number
            comments(last: 100) {
              nodes {
                id
                createdAt
                author {
                  avatarUrl
                  ... on User {
                    id
                    email
                    name
                  }
                }
                bodyHTML
              }
            }
            labels(first: 100) {
              nodes {
                color
                id
                name
              }
            }
        }
      }
    }
  `;

    const {
      repository: { issue },
    } = await this.octokit.graphql<{ repository: Repository }>(query, {
      owner,
      repository,
      number: Number(number),
    });

    this.responseCache.set(requestKey, issue);

    return mapToCustomIssueDetail(issue);
  }

  private parseStatus(maybeStatus: string) {
    if (!maybeStatus) {
      return ["OPEN", "CLOSED"];
    }

    if (maybeStatus === "open") {
      return ["OPEN"];
    }

    if (maybeStatus === "closed") {
      return ["CLOSED"];
    }
    return ["OPEN", "CLOSED"];
  }

  public async getIssues(owner: string, repository: string, count: number, status: string): Promise<CustomIssue[]> {
    this.logger.debug("Fetch issues", {
      repository,
      owner,
    });

    const requestKey = `${owner}/${repository}/${count}/${status}`;

    if (this.responseCache.has(requestKey)) {
      return this.responseCache.get<Issue[]>(requestKey).map(mapToCustomIssue);
    }

    const statusFilter = this.parseStatus(status);

    //TODO: syntax highlighting
    const query = `
    query repoIssues($owner: String!, $repository: String!, $num: Int!, $states: [IssueState!]) {
      repository(name: $repository, owner: $owner) {
        issues(last: $num, filterBy: {states: $states}) {
          nodes {
            author {
              avatarUrl
              ... on User {
                name
                email
                login
              }
            }
            id
            title
            bodyText
            createdAt
            closed
            number
            labels(first: 100) {
              nodes {
                color
                id
                name
              }
            }
          }
        }
      }
    }
  `;

    const {
      repository: {
        issues: { nodes },
      },
    } = await this.octokit.graphql<{ repository: Repository }>(query, {
      owner,
      repository,
      num: count,
      states: statusFilter,
    });

    this.responseCache.set(requestKey, nodes);

    return nodes.map(mapToCustomIssue);
  }
}
