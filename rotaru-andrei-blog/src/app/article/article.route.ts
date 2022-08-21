import { Routes } from '@angular/router';
import {ArticleComponent} from "./article.component";
import {ArticleEditComponent} from "./article-edit/article-edit.component";
import {ArticleDetailComponent} from "./article-detail/article-detail.component";
import { LoginComponent } from '../login/login.component';

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },

  {
    path: 'new',
    component: ArticleEditComponent,
  },

  {
    path: ':id/view',
    component: ArticleDetailComponent,
  },

  {
    path: ':id/edit',
    component: ArticleEditComponent,
  },

  {
    path: ':login',
    component: LoginComponent,
  }

]


