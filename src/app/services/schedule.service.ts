import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly apiUrl = environment.api_uri + 'schedule/';

  constructor(private readonly http: HttpClient) { }

  getSchedules(userId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}schedule?user=${userId}`)

  }
}
