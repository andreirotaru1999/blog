import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ArticlesController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { Axios } from 'axios';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository]), Axios],
  controllers:[ArticlesController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}