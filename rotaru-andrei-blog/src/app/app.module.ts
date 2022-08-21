import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  {HttpClientModule } from "@angular/common/http";
import { ArticleComponent } from './article/article.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { articleRoute } from "./article/article.route";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommentComponent } from './comment/comment.component';
import { CommentEditComponent } from './comment/comment-edit/comment-edit.component';
import { LoginComponent } from './login/login.component';

const articleRoutes = [...articleRoute];

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleEditComponent,
    ArticleDetailComponent,
    CommentComponent,
    CommentEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forChild(articleRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
