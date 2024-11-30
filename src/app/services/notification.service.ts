import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }



  requestPermisions(){
    if (Notification.permission === 'granted') {
      this.initializeNotifications()
    }else{
      Notification.requestPermission()
    }

  }



  initializeNotifications( ) {


    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    });
  }
  initializeNotificationsPWA(){

  }



  showLocalNotification(data:any){

    if('Notification' in window && Notification.permission === 'granted'){
      const title = data.title;
      const body = data.body;
      const icon = './../../assets/icon/favicon.png';

      new Notification(title, {
        body,
        icon
      });
    }
  }
}
