import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { Article } from './article/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'icedmg99',
      database: 'blog',
      entities: [Article, Comment],
      synchronize: true,
    }),
    ArticleModule,
    CommentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
