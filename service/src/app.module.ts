import { BetterLoggerModule } from "@einsenundnullen/better-nestjs-logger";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import * as Joi from "joi";
import { GithubModule } from "./github/github.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    BetterLoggerModule.forRoot({
      requestMiddleware: {
        headers: false,
        redactedHeaders: ["authorization", "cookie"],
      },
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GH_TOKEN: Joi.string().min(3).required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    HealthModule,
    GithubModule,
  ],
})
export class AppModule {}
