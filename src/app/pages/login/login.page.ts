import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';

import { CookieService } from '../../services/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {


  credentials: string = '';
  password: string = '';

  // #region Constructor
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly userService: UserService,
    private readonly alertController: AlertController,
    private readonly cookieService: CookieService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loadingController: LoadingController
  ) { }
  // #endregion

  // #region Login normal
  async login() {
    const user: User = {
      credentials: this.credentials ?? undefined,
      password: this.password ?? undefined,
    };

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent' // You can customize the spinner type
    });

    await loading.present();

    this.userService.login(user)
      .subscribe(resp => {
        loading.dismiss(); // Dismiss loader on successful response
        this.cookieService.setToken(resp.token);
        this.router.navigate(["calendar"])
      }, (error) => {
        loading.dismiss(); // Dismiss loader on error
        this.ErrorAlert();
        console.log(error);
      });
  }

  // #endregion

  // #region Login con Google
  loginWithGoogle(): void {
    console.log("click");
    this.authGoogleService.login();
  }

  // #endregion


  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error...',
      subHeader: 'Datos incorrectos',
      message: 'Revisa tus credenciales y vuelve a intentarlo',
      buttons: ['OK']
    });

    await alert.present();
  }
}
