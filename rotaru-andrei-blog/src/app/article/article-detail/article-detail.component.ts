import { Component, OnInit } from '@angular/core';
import { Article} from "../article.model";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  constructor(
    protected  activatedRoute: ActivatedRoute,
    private  articleService:ArticleService) {
  }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params.id;
    this.articleService.find(id).subscribe(
      (rez: Article) => this.article = rez
    );
  }

}
