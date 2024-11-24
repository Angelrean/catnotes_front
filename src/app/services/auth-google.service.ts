import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Platform, isPlatform } from '@ionic/angular'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { Auth, signInWithRedirect, GoogleAuthProvider, signOut, signInWithPopup } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private readonly googleAuthUrl = `${environment.api_uri}auth/google`;

  user: any;
  constructor( private http: HttpClient, private platform: Platform, private readonly auth: Auth) {

    this.initializeApp();
  }

  initializeApp() {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize(
        {
          clientId: environment.clientId,
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        }
      )

    }
    this.platform.ready().then(() => {
      GoogleAuth.initialize(
        {
          clientId: environment.clientId,
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        }
      )

    })


  }
  // initLogin(): void {

  //   GoogleAuth.initialize({
  //     clientId: environment.clientId,
  //     scopes: ['profile', 'email'],
  //     grantOfflineAccess: true,
  //   });

  //   const config: AuthConfig = environment.auth_config;

  //   this.oAuthServiceGoogle.configure(config);
  //   this.oAuthServiceGoogle.setupAutomaticSilentRefresh();
  //   this.oAuthServiceGoogle.loadDiscoveryDocumentAndTryLogin();
  // }

  // login(): void {
  //   this.oAuthServiceGoogle.initLoginFlow();
  // }

  // register(): void {
  //   this.oAuthServiceGoogle.initLoginFlow();
  // }

  async logout() {
    await  GoogleAuth.signOut();
  }

  // async getProfile(): Promise<any> {
  //   return this.oAuthServiceGoogle.getIdentityClaims();
  // }

  async googleSignIn() {
    console.log("Service to login with google");

    this.user = await GoogleAuth.signIn();

    return await this.user;

  }


  async loginWithGoogle(){
    // return await signInWithPopup(this.auth, new GoogleAuthProvider())
    console.log("Service to login with google");

    this.user = await GoogleAuth.signIn();
    const googleUser: any = {};
    googleUser.googleId = this.user.id
    googleUser.name = this.user.givenName + this.user.familyName
    googleUser.email = this.user.email

    console.log("user", googleUser.name);

    return await googleUser;
  }

  /**
   * Enviar el token de Google al backend para intercambiarlo por un JWT
   * @param googleToken El ID token de Google
   * @returns Observable con el JWT
   */
  exchangeGoogleTokenForJwt(data: any): Observable<any> {
    console.log(data);

    return this.http.post(this.googleAuthUrl, { data: data });
  }
}
