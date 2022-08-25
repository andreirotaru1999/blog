import { Component, OnInit } from '@angular/core';
import { Article } from './article.model';
import  { ArticleService } from './article.service';
import {NotificationService} from "../notification.service";
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Article [] = [];
  role;
  currentPage = 0;
  articlesOnPage = 5;
  numberOfArticles;
  constructor(
    private  articleService: ArticleService,
    private  notifyService: NotificationService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.articleService.getArticles(this.currentPage).subscribe(article => this.articles = article);
    this.articleService.getArticlesCount().subscribe((number) => {this.numberOfArticles = number}
    );
    this.role = document.cookie;

  }

  nextPage() {
    this.currentPage++;
    this.articleService.getArticles(this.currentPage).subscribe(article => this.articles = article);
  }

  prevPage() {
    this.currentPage--;
    this.articleService.getArticles(this.currentPage).subscribe(article => this.articles = article);
  }
  
  lastPage() {
    return Math.floor(this.numberOfArticles / this.articlesOnPage) ;
  }

  deleteArticle(id: string) {
    if(!id){
      this.notifyService.showWarning("There is no article to delete","Warning");
    }
    else{
      if(confirm("Are you sure to delete this article?")) {
        this.articleService.delete(id).subscribe(() => {
          this.articles.splice(this.articles.findIndex( article => article.id = id), 1);
          // this.articleService.getArticles().subscribe(article => this.articles = article);
        });
        this.numberOfArticles--;
        this.notifyService.showWarning("Article deleted", "Notification");
      };
    }
  }

  logout(): void {
    console.log("logout");
    this.loginService.logout().subscribe();
    this.role = null;
  }

}
