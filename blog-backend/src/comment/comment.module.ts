import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from '../comment/comment.repository';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    ArticleModule,
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
