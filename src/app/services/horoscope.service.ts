import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {

  private apiURL = 'https://ohmanda.com/api/horoscope/'

  constructor(private http: HttpClient) { }

  getHoroscope(sign: string): Observable<any>{
    return this.http.get(`${this.apiURL}${sign}/`);
  }
}
