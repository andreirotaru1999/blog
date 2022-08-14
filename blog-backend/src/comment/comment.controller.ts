import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment} from './comment.entity';

@Controller('')
export class CommentController {
  constructor(private service: CommentService) {}

  @Post('/articles/:id/comments')
  async create(@Body() comment: Comment, @Param('id') articleId: string) {
    return this.service.create(comment, articleId);
  }

  @Get('/articles/:id/comments')
  async findCommentByArticle(@Param('id') articleId: string) {
    return this.service.findCommentsByArticle(articleId);
  }

  @Get('/comment/:id')
  async findOne(@Param('id') id: string) {
    return this.service.findComment(id);
  }

  @Put('/:id')
  async update(@Body() comment: Comment) {
    return this.service.update( comment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.remove(id);
  }

  @Get('/articles/comments/:parentId')
  async findCommentByParent(@Param('parentId') parentId: string) {
    return this.service.findCommentsByParent(parentId);
  }
}
