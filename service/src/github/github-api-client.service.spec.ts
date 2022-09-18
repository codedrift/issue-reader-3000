import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GithubApiClientService } from "./github-api-client.service";
import { GithubIssueResolver } from "./github-issue.resolver";

describe("GithubService", () => {
  let service: GithubApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [GithubApiClientService, GithubIssueResolver],
    }).compile();

    service = module.get<GithubApiClientService>(GithubApiClientService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
