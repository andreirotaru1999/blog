import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment} from "./comment.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public createComment(id: string, comment:Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/articles/${id}/comments/new`, comment);
  }

  public getCommentsByParent(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/articles/comments/${id}/children`);
  }
  
  public getCommentsById(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/articles/${id}/comments`);
  }

  public findComment(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/articles/comments/${id}`);
  }
  public editComment(id: number, comment:Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/${id}`, comment);
  }
  public deleteComment(id:string):Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiUrl}/articles/comments/${id}`);
  }

}
