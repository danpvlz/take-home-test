import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GitHubApiModule } from './github-api/github-api.module';

@Module({
  imports: [ConfigModule.forRoot(), GitHubApiModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
