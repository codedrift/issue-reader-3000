import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Max, Min } from "class-validator";

@ArgsType()
export class IssuesArgs {
  @Field(() => Int)
  @Min(0)
  @Max(100)
  count = 100;

  @Field({ nullable: false })
  owner: string;

  @Field({ nullable: false })
  repository: string;

  @Field()
  status: string;
}

@ArgsType()
export class IssueArgs {
  @Field({ nullable: false })
  owner: string;

  @Field({ nullable: false })
  repository: string;

  @Field({ nullable: false })
  number: number;
}
