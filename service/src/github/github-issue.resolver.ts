import { Logger, NotFoundException } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { IssueArgs, IssuesArgs } from "./dto/issue-args.dto";
import { GithubApiClientService } from "./github-api-client.service";
import { CustomIssue, CustomIssueDetail } from "./models/issue.model";

@Resolver(() => CustomIssue)
export class GithubIssueResolver {
  private logger = new Logger(GithubIssueResolver.name);

  constructor(private readonly githubApiClientService: GithubApiClientService) {}

  @Query(() => CustomIssueDetail)
  async issue(@Args() issueArgs: IssueArgs): Promise<CustomIssueDetail> {
    this.logger.debug("Resolve issue", issueArgs);

    const issueDetail = await this.githubApiClientService.getIssueById(
      issueArgs.owner,
      issueArgs.repository,
      issueArgs.number,
    );
    if (!issueDetail) {
      throw new NotFoundException(`${issueArgs.owner}/${issueArgs.repository}/${issueArgs.number}`);
    }
    return issueDetail;
  }

  @Query(() => [CustomIssue])
  async issues(@Args() issuesArgs: IssuesArgs): Promise<CustomIssue[]> {
    this.logger.debug("Resolve issues", issuesArgs);
    const issues = await this.githubApiClientService.getIssues(
      issuesArgs.owner,
      issuesArgs.repository,
      issuesArgs.count,
      issuesArgs.status,
    );
    return issues;
  }
}
