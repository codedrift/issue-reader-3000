import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Issue, IssueDetail } from "../model/issue.model";
import { StatusFilter } from "../model/status.model";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export const ApiClient = {
  fetchIssues: async ({
    owner,
    repository,
    status,
  }: {
    owner: string;
    repository: string;
    status: StatusFilter;
  }): Promise<Issue[]> => {
    const {
      data: { issues },
    } = await client.query<{ issues: Issue[] }>({
      query: gql`
        query {
          issues(owner: "${owner}", repository: "${repository}", status: "${status}") {
            id
            title
            createdAt
            body
            author {
              name
              avatar
            }
            closed
            number
          }
        }
      `,
    });

    return issues;
  },

  fetchIssueDetail: async ({
    owner,
    repository,
    number,
  }: {
    owner: string;
    repository: string;
    number: number;
  }): Promise<any> => {
    const {
      data: { issue },
    } = await client.query<{ issue: IssueDetail }>({
      query: gql`
        query {
          issue(owner: "${owner}", repository: "${repository}", number: ${number}) {
            id
            title
            createdAt
            bodyHTML
            author {
              name
              avatar
            }
            comments {
              id
              author {
                name
                avatar
              }
              bodyHTML
              createdAt
            }
            closed
            number
          }
        }
      `,
    });

    return issue;
  },
};
