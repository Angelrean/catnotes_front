import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {



  }


  initLogin(): void{
    const config: AuthConfig={
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '512339523442-2f7kre2vcijsldq4n30t56fo8jlvsfjd.apps.googleusercontent.com',
      redirectUri: window.location.origin+ "/calendar",
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);


    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login():void{
    this.oAuthService.initLoginFlow();
  }


  logout():void{
    this.oAuthService.logOut();
  }


  getProfile(): Record<string, any> {
    return this.oAuthService.getIdentityClaims();
  }




}