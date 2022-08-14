import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import {ArticleService} from '../article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository) private repository: CommentRepository,
    private service: ArticleService
  ) {
  }
  async create(comment: Comment, articleId: string ) :Promise<Comment>{
    comment.createdOn = new Date();
    const article = await this.service.findArticle(articleId);
    comment.article=article;
    if(comment.parentId){
      let parent:Comment = await this.findComment(comment.parentId);
      parent.numberOfChildren++;
      this.update(parent);
    }
    console.log(comment, "response to create");
    return await this.repository.save(comment);
  }

  async findCommentsByArticle(articleId: string) :Promise<Comment[]>{
    const query = this.repository.createQueryBuilder('c')
      .where("c.article_id = :id", {id:articleId})
      .andWhere("c.parent_id is NULL");
    const comments = await query.getMany();
    console.log(comments, "response to findCommentsByArticle");
    return  comments;
  }

  async findComment(id: string) :Promise<Comment>{
    const found = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if(!found){
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    console.log(found, "response to findComment");

    return found;
  }

  async findCommentsByParent(parentId: string)  :Promise<Comment[]>{
    const query = this.repository.createQueryBuilder('c')
      .where("c.parentId = :id", {id:parentId});
    const children = await query.getMany();
    console.log(children, "response to findCommentsByParent");
    return children;
  }

  async update(comment: Comment ) :Promise<Comment>{
    const found: Comment = await this.repository.findOne({
      where: {
        id: comment.id,
      },
    });
    if(!found){
      throw new HttpException('No comment found to update', HttpStatus.NOT_FOUND);
    }
    return await  this.repository.save(comment);
  }

  async remove(id: string) :Promise<DeleteResult>{
    const children = await this.findCommentsByParent(id);
    for(let child of children) {
      await this.repository.delete(child.id);
    }
    let comment:Comment = await this.findComment(id);
    if(comment.parentId){
      let parent:Comment = await this.findComment(comment.parentId);
      parent.numberOfChildren--;
      this.update(parent);
    }
    return await this.repository.delete(id);
  }
}
