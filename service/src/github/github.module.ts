import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GithubApiClientService } from "./github-api-client.service";
import { GithubIssueResolver } from "./github-issue.resolver";

@Module({
  imports: [ConfigModule],
  providers: [GithubApiClientService, GithubIssueResolver],
  exports: [GithubApiClientService],
})
export class GithubModule {}
