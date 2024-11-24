import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CheckNetworkConnection } from 'src/app/decorators/check-network-connection';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() page:string = '';
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly cookieService: CookieService,
    private readonly router: Router

  ) { }

  ngOnInit() {}

  @CheckNetworkConnection()
  logout(): void {

    this.authGoogleService.logout();
    this.cookieService.removeToken();

    this.router.navigate(["login"]);

  }
}
