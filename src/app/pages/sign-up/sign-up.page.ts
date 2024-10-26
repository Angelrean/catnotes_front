import { Component } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})


export class SignUpPage {

  constructor(private readonly authGoogleService: AuthGoogleService) {
    this.authGoogleService.initLogin();
   }
  register():void{
    this.authGoogleService.login();

  }


}

