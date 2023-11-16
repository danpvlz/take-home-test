import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GitHubApiRouter } from './github-api/github-api.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const gitHubApiRouter = app.get(GitHubApiRouter);

  gitHubApiRouter.applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
