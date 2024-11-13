import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.api_uri + 'user/';

  constructor(private readonly http: HttpClient) { }

  register(userData: User): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.post(`${this.apiUrl}register`, userData, {headers})
  }
  login(userData: User): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' });

    return  this.http.post(`${this.apiUrl}login`, userData, {headers})
  }
}
