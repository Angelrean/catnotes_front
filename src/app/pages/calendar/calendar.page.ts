import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/services/auth-google.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(private authGoogleService: AuthGoogleService, private router: Router) { }

  ngOnInit() {

    let profile = this.authGoogleService.getProfile()

    console.table(profile);
  }

  logout():void{
    this.authGoogleService.logout();
    this.router.navigate(['/login']);
  }

}
