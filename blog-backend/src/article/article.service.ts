import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleRepository) private repository: ArticleRepository
  ) {
  }

  async  create (article:Article) :Promise<Article>{
    article.createdOn = new Date();
    return await this.repository.save(article);
  }

  async getAllArticles() :Promise<Article[]>{
    return await this.repository.find();
  }

  async  findArticle(id: string) {
    const found: Article = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if(!found){
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  async update(article:Article) :Promise<Article>{
    let found: Article = await this.repository.findOne({
      where: {
        id: article.id,
      },
    });
    if(!found){
      throw new HttpException('No article found to update', HttpStatus.NOT_FOUND);
    }
    article.updatedOn = new Date();
    return await this.repository.save(article);
  }

  async  deleteArticle(id: string) :Promise<DeleteResult>{
    return await this.repository.delete(id);
  }
}

