import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AlertController } from "@ionic/angular";

import { CookieService } from '../../services/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {


  credentials: string = '';
  password: string = '';

  //#region Constructor
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly userService: UserService,
    private readonly alertController: AlertController,
    private readonly cookieService: CookieService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {



  }
  //#endregion

  //#region Login normal
  login():void{
    const user: User = {
      credentials: this.credentials ?? undefined ,
      password: this.password ?? undefined,
    };

    console.log(user);

    this.userService.login(user)
      .subscribe(
        {
          next: (resp: any) => {
            this.cookieService.setToken(resp.token);
            this.router.navigate(["/"])




          },
          error: (error: any) => {
            this.ErrorAlert(error.error.msg)


          }
        });

  }

  //#endregion

  //#region  Login con Google
  loginWithGoogle():void{
    console.log("click");

    this.authGoogleService.login();
  }

  //#endregion


  async ErrorAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Error...',
      subHeader: 'Datos incorrectos',
      message: 'Revisa tus credenciales y vuelve a intentarlo',
      buttons: ['OK']
    });

    await alert.present();
  }
}
