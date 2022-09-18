import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "author" })
export class AuthorInfo {
  @Field()
  avatar: string;

  @Field()
  name: string;
}
@ObjectType({ description: "issue" })
export class CustomIssue {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  createdAt: string;

  @Field()
  body: string;

  @Field(() => AuthorInfo)
  author: AuthorInfo;

  @Field()
  closed: boolean;

  @Field()
  number: number;
}

@ObjectType({ description: "comment" })
export class CommentData {
  @Field(() => ID)
  id: string;

  @Field(() => AuthorInfo)
  author: AuthorInfo;

  @Field()
  bodyHTML: string;

  @Field()
  createdAt: string;
}

@ObjectType({ description: "issue-detail" })
export class CustomIssueDetail {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  createdAt: string;

  @Field()
  bodyHTML: string;

  @Field(() => AuthorInfo)
  author: AuthorInfo;

  @Field()
  closed: boolean;

  @Field()
  number: number;

  @Field(() => [CommentData])
  comments: CommentData[];
}
