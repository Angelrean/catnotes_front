import { Component, inject, OnInit } from '@angular/core';

import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  private readonly _messaging = inject(Messaging);
  private readonly _env = environment;
  constructor(
  private readonly notificationService: NotificationService

  ) {
  }

  ngOnInit(): void {
    this._getDeviceToken();
    this._onMessage();
    this.notificationService.requestPermisions();

  }

  private _getDeviceToken(): void {
    getToken(this._messaging, { vapidKey: this._env.vapidKey })
      .then((token) => {
        console.log(token);
        // save the token in the server, or do whathever you want
      })
      .catch((error) => console.log('Token error', error));
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => console.log('Message', payload),
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
