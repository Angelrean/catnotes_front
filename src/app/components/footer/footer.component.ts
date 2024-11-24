import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CheckNetworkConnection } from 'src/app/decorators/check-network-connection';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}



  goToCalendar() {
    this.router.navigate(['/calendar']);
  }

  @CheckNetworkConnection()

  goToSchedule() {
    this.router.navigate(['/schedule']);
  }

  @CheckNetworkConnection()
  goToZodiac() {
    this.router.navigate(['/zodiac']);
  }
}
