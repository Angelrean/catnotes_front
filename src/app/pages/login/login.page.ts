import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authGoogleService: AuthGoogleService) {
    this.authGoogleService.initLogin();
   }

  ngOnInit() {
  }


  login():void{
    this.authGoogleService.login();
  }
}
