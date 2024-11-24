import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly baseUrl = environment.api_uri; // Base URL desde el environment
  private readonly scheduleUrl = `${this.baseUrl}schedule/`; // Endpoint de schedules
  private readonly schedulesUrl = `${this.baseUrl}schedules/`; // Endpoint de schedules
  private readonly subjectUrl = `${this.baseUrl}schedule/subject/`; // Endpoint de subjects

  constructor(private readonly http: HttpClient) { }

  /**
   * Obtener todos los horarios de un usuario
   */
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(this.schedulesUrl);
  }




  /**
   * Crear un nuevo horario
   * @param day Día de la semana
   */
  createSchedule(day: string): Observable<any> {
    return this.http.post(this.scheduleUrl, { day });
  }

  /**
   * Crear un nuevo subject dentro de un horario
   * @param scheduleId ID del horario
   * @param subjectData Datos del subject a crear
   */
  createSubject(scheduleId: string, subjectData: any): Observable<any> {
    return this.http.post(this.subjectUrl, { scheduleId, subject: subjectData });
  }

  /**
   * Actualizar un subject existente
   * @param subjectId ID del subject
   * @param subjectData Datos actualizados del subject
   */
  updateSubject(subjectId: string, subjectData: any): Observable<any> {
  const params = new HttpParams().set('subjectId', subjectId);

    return this.http.put(`${this.subjectUrl}`, subjectData, {params});
  }

  /**
   * Eliminar un subject por ID
   * @param subjectId ID del subject a eliminar
   */
  deleteSubject(subjectId: string): Observable<any> {
    return this.http.delete(`${this.subjectUrl}${subjectId}`);
  }

  /**
 * Obtener todos los subjects de un usuario
 */
getAllSubjects(): Observable<{ subjects: any[] }> {


  return this.http.get<{ subjects: any[] }>(`${this.scheduleUrl}subjects`);
}

/**
 * Obtener los subjects de un día específico
 * @param day Día de la semana
 */
getSubjectsByDay(day: string): Observable<{ subjects: any[] }> {
  const params = new HttpParams().set('day', day);
  return this.http.get<{ subjects: any[] }>(`${this.scheduleUrl}subjectsByDay`, { params });
}


}
