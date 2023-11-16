import { Module } from '@nestjs/common';
import { GitHubService } from './github-api.service';
import { GitHubApiRouter } from './github-api.router';

@Module({
  imports: [],
  controllers: [],
  providers: [GitHubService, GitHubApiRouter],
})
export class GitHubApiModule {}