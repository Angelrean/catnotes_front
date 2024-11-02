import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) { }

  ngOnInit() {

    const token = this.cookieService.getToken();

    console.table(token);
  }

  logout():void{
    this.authGoogleService.logout();
    this.router.navigate(['/login']);
  }

}
