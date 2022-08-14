import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleService} from './article.service';


@Controller('articles')
export  class ArticlesController {
  constructor(private service: ArticleService) { }


  @Post('new')
  async  addArticle(@Body() article: Article) {
    return await this.service.create(article);
  }

  @Get('')
  async getAllArticle() {
    return await this.service.getAllArticles();
  }

  @Get('/:id')
  async getArticle(@Param('id') id: string) {
    return await this.service.findArticle(id);
  }

  @Put('/edit')
  async  editArticle(@Body() article: Article) {
    return await this.service.update(article);
  }

  @Delete('/:id')
  async deleteArtice(@Param('id') id: string) {
      const user = await this.service.findArticle(id);
      return await  this.service.deleteArticle(id);
  }
}