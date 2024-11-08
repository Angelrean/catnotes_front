import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    console.log("hola");

  }

  logout():void{

    this.authGoogleService.logout();
    this.cookieService.removeToken();

    this.router.navigate(["login"])



  }

}
