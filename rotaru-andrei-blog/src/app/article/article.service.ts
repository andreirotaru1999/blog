import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article} from './article.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }
  public createArticle(article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articles/new`, article , {withCredentials:true});
  }
  public find(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`);
  }
  public edit(id: number, article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/${id}/edit`, article, {withCredentials:true});
  }
  public delete(id:string):Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/articles/${id}`);
  }
}
