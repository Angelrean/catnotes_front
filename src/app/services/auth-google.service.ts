import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService) {
    this.initLogin();


  }


  initLogin(): void{
    console.log('initializing');

    const config: AuthConfig=environment.auth_config

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log(this.oauthService);

  }

  login():void{
    this.oauthService.initLoginFlow();

  }


  logout():void{
    this.oauthService.logOut();
  }


  getProfile(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }




}
