import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { CookieService } from '../../services/cookie.service';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleDocument } from '../../interfaces/schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  schedule: ScheduleDocument[]; // Initialize an empty variable with the interface type

  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly scheduleService: ScheduleService
  ) {
    this.schedule = new Array<ScheduleDocument>(0);

  }

  ngOnInit() {
    console.log("hola");
    const userId = this.cookieService.getTokenPayload();

    this.scheduleService.getSchedules(userId.user.id)
      .subscribe(
        resp => {

          this.schedule = resp;
        },
        error => {
          console.error(error);
        }
      );
  }

  logout(): void {

    this.authGoogleService.logout();
    this.cookieService.removeToken();

    this.router.navigate(["login"]);

  }

}
