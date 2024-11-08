import { Component } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';
import { CookieService } from '../../services/cookie.service';

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

  constructor(
    private readonly alertController: AlertController,
    private readonly authGoogleService: AuthGoogleService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

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
          this.ErrorAlert(error.error.msg)
          console.error('Registration failed:', error.error.msg);


        }
      });

  }
  async ErrorAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Lo siento...',
      subHeader: 'Alguien ha usado tu nombre de usuario o tu correo',
      message: 'Por favor elige otro nombre de usuario o inicia sesión con tu correo',
      buttons: ['OK']
    });

    await alert.present();
  }


  register(): void {
    this.authGoogleService.login();
  }
}
