import { Component } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';
import { CheckNetworkConnection } from 'src/app/decorators/check-network-connection';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  user: any;

  constructor(
    private readonly alertController: AlertController,
    private readonly authGoogleService: AuthGoogleService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly loadingController: LoadingController

  ) {}

  @CheckNetworkConnection()
  submit() {
    if (this.password !== this.repeatPassword) {
      console.error('Passwords do not match');
      return; // Prevent form submission if passwords don't match
    }

    const user: User = {
      fullName: this.name ?? undefined ,
      username: this.username ?? undefined,
      email: this.email ?? undefined,
      password: this.password ?? undefined,
      googleId: undefined,

    };

    this.userService.register(user).subscribe(
      {
        next: (resp: any) => {
          console.log('Registration successful:', resp);
          this.cookieService.setToken(resp.token)
          this.router.navigate(["/"])

          // Handle successful registration (e.g., redirect to login page)
        },
        error: (error: any) => {
          this.ErrorAlert()
          console.error('Registration failed:', error.error.msg);


        }
      });

  }
  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Lo siento...',
      subHeader: 'Alguien ha usado tu nombre de usuario o tu correo',
      message: 'Por favor elige otro nombre de usuario o inicia sesión con tu correo',
      buttons: ['OK']
    });

    await alert.present();
  }

  @CheckNetworkConnection()
  async register() {

    console.log("Iniciando sesión con Google...");
    try {
      let userData: any = {}
      await this.authGoogleService.loginWithGoogle()
        .then((result: any) => {
          userData = result;


        }).catch((err: any) => {
          console.error(err);

        });
      // Abrir flujo de autenticación con Google
      console.log('user:', userData)





      // Intercambiar el token de Google por un JWT en el backend
      const loading = await this.loadingController.create({
        message: 'Autenticando con Google...',
        spinner: 'crescent'
      });

      await loading.present();

      this.authGoogleService.exchangeGoogleTokenForJwt(userData)
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
}
