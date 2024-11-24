import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { FormsModule } from '@angular/forms';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })],

  exports: [

    RouterModule
  ],

  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy},
    OAuthService,
    HttpClient,
  {provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true},
  provideFirebaseApp(() => initializeApp({"projectId":"catnotes-bc632","appId":"1:364962378829:web:e05e25c6a7ca986ce85804","storageBucket":"catnotes-bc632.firebasestorage.app","apiKey":"AIzaSyBckcUhc-VqpIzYJ9bae_LYL65PZ8At2kU","authDomain":"catnotes-bc632.firebaseapp.com","messagingSenderId":"364962378829"})),
  provideAuth(() => getAuth()),
  provideMessaging(() => getMessaging())],
  bootstrap: [AppComponent],
})
export class AppModule {}
