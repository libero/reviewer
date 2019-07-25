import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './packages/config/config.module';
import { SubmissionModule } from './packages/submission/submission.module';
import * as ormconfig from './ormconfig';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule,
    SubmissionModule,
  ],
  providers: [AppService],
})
export class AppModule {}
