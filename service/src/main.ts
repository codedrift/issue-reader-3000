import { BetterLogger } from "@einsenundnullen/better-nestjs-logger";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Buffer logs ensures all logs get sent to the correct logger
    bufferLogs: true,
  });

  app.useLogger(app.get(BetterLogger));
  await app.listen(8080);

  const url = await app.getUrl();

  logger.log(`App listening on ${url}`);
}
bootstrap();
