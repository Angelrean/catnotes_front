import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
import { CookieService } from '../../services/cookie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckNetworkConnection } from 'src/app/decorators/check-network-connection';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit    {

  credentials: string = '';
  password: string = '';
  user: any = {};

  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly userService: UserService,
    private readonly alertController: AlertController,
    private readonly cookieService: CookieService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loadingController: LoadingController,
    private readonly notificationService: NotificationService
  ) { }


  ngOnInit(){
  }



  // #region Login normal
  @CheckNetworkConnection()
  async login() {
    const user: User = {
      credentials: this.credentials ?? undefined,
      password: this.password ?? undefined,
    };

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    this.notificationService.showLocalNotification(
      {
        title: 'CatNotes',
        body: 'Iniciando sesión...'
      }
    )
    await loading.present();

    this.userService.login(user)
      .subscribe(resp => {
        loading.dismiss(); // Ocultar loader en caso de éxito
        this.cookieService.setToken(resp.token);
        this.router.navigate(["calendar"]);
      }, (error) => {
        loading.dismiss(); // Ocultar loader en caso de error
        this.ErrorAlert();
        console.log(error);
      });
  }
  // #endregion

  // #region Login con Google
  @CheckNetworkConnection()
  async loginWithGoogle() {
    console.log("Iniciando sesión con Google...");
    try {
      await this.authGoogleService.loginWithGoogle()
        .then((result: any) => {
          console.log(result);

          this.user = result

        })

        .catch((err: any) => {
          console.error(err);

        });
      // Abrir flujo de autenticación con Google
      console.log('user:', this.user)




      // Intercambiar el token de Google por un JWT en el backend
      const loading = await this.loadingController.create({
        message: 'Autenticando con Google...',
        spinner: 'crescent'
      });

      this.notificationService.showLocalNotification(
        {
          title: 'CatNotes',
          body: 'Autenticando con Google...'
        }
      )

      await loading.present();

      this.authGoogleService.exchangeGoogleTokenForJwt(this.user)
        .subscribe((resp: any) => {
          loading.dismiss();
          console.log('JWT recibido:', resp);
          this.cookieService.setToken(resp.token); // Guardar JWT en cookies
          this.router.navigate(['/calendar']); // Redirigir al calendario
        }, (error: any) => {
          loading.dismiss();
          console.error('Error intercambiando el token:', error);
          this.ErrorAlert();
        });

    } catch (error) {
      console.error('Error durante el login con Google:', error);
      this.ErrorAlert();
    }
  }
  // #endregion

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error...',
      subHeader: 'No se pudo iniciar sesión',
      message: 'Inténtalo nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
}


