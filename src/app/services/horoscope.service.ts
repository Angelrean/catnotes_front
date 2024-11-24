import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {

  private apiURL = environment.api_uri + "horoscope/"

  constructor(private http: HttpClient) { }

  getHoroscope(sign: string): Observable<any>{
    return this.http.get(`${this.apiURL}${sign}/`);
  }
}
