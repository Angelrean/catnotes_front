import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from '../../services/cookie.service';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleDocument } from '../../interfaces/schedule';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  schedule: any[]; // Initialize an empty variable with the interface type

  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly scheduleService: ScheduleService
  ) {
    this.schedule = new Array<any>(0);

  }

  ngOnInit() {
    // Obtener todos los subjects del usuario
    this.scheduleService.getAllSubjects().subscribe(
      (resp: { subjects: any[] }) => {
        console.log('Subjects:', resp.subjects);
        this.schedule = resp.subjects; // Asignar los subjects obtenidos
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }





}
