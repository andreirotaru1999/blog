import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    private apiUrl = 'http://localhost:3000';
    isLoggedIn = new EventEmitter();

    constructor(private http: HttpClient) {}


      public login(user): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/user/login`, user, {withCredentials:true});
      }    
      public getUser(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user`, {withCredentials:true});
      }
      public logout(): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/user/logout`, {}, {withCredentials:true});
      }
}