import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import  { ArticleService } from './article.service';
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article [] = [];
  constructor(
    private  articleService: ArticleService,
    private  notifyService: NotificationService
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(article => this.articles = article);
  }

  deleteArticle(id: string) {
    if(!id){
      this.notifyService.showWarning("There is no article to delete","Warning");
    }
    else{
      if(confirm("Are you sure to delete this article?")) {
        this.articleService.delete(id).subscribe(() => {
          this.articles.splice(this.articles.findIndex( article => article.id = id), 1);
          this.articleService.getArticles().subscribe(article => this.articles = article);
        });
        this.notifyService.showWarning("Article deleted", "Notification");
      };
    }
  }

}
