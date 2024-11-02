import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin()


  }


  initLogin(): void{
    const config: AuthConfig=environment.auth_config

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
