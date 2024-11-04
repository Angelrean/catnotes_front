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
    const token = this.cookieService.getToken();
    // if (!token) {
    //   this.router.navigate(['/login']);
    //   return; // Exit the function if no token is found
    // }

    // Rest of your code that relies on user data or token
    const user = this.authGoogleService.getProfile();
    console.table(token);
    console.table(user);
    console.log(user['picture']);
  }

  logout():void{

    this.authGoogleService.logout();
    this.cookieService.removeToken();

    this.router.navigate(["/login"])



  }

}
