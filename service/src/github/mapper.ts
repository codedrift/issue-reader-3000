import { Issue } from "@octokit/graphql-schema";
import { AuthorInfo, CommentData, CustomIssue, CustomIssueDetail } from "./models/issue.model";

export const mapToAuthorInfo = (authorData: any) => {
  const author = new AuthorInfo();

  author.avatar = authorData.avatarUrl;
  //TODO: fix access typings
  author.name = authorData["name"] ?? authorData["login"] ?? authorData["email"] ?? "unknown";

  return author;
};

export const mapToCustomIssue = (apiIssue: Issue): CustomIssue => {
  const customIssue = new CustomIssue();

  const author = mapToAuthorInfo(apiIssue.author);

  customIssue.id = apiIssue.id;
  customIssue.title = apiIssue.title;
  customIssue.closed = apiIssue.closed;
  customIssue.createdAt = apiIssue.createdAt;
  customIssue.body = apiIssue.bodyText;
  customIssue.author = author;
  customIssue.number = apiIssue.number;

  return customIssue;
};

export const mapToCustomIssueDetail = (apiIssue: Issue): CustomIssueDetail => {
  const customIssue = new CustomIssueDetail();

  const author = mapToAuthorInfo(apiIssue.author);

  const comments = apiIssue.comments.nodes.map((c) => {
    const comment = new CommentData();
    comment.author = mapToAuthorInfo(c.author);
    comment.id = c.id;
    comment.bodyHTML = c.bodyHTML;
    comment.createdAt = c.createdAt;

    return comment;
  });

  customIssue.id = apiIssue.id;
  customIssue.title = apiIssue.title;
  customIssue.closed = apiIssue.closed;
  customIssue.createdAt = apiIssue.createdAt;
  customIssue.bodyHTML = apiIssue.bodyHTML;
  customIssue.author = author;
  customIssue.comments = comments;
  customIssue.number = apiIssue.number;

  return customIssue;
};
