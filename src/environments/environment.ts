// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_uri: 'https://catnotes-back-production.up.railway.app/api/',
  api_uri: 'http://localhost:5000/api/',
  auth_config: {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: '512339523442-j64ti20gb98ne55lrbpmmrtpcsi1mghn.apps.googleusercontent.com',
    redirectUri: window.location.origin+ "/google-auth-login",
    scope: 'openid profile email',

  },
  clientId: '512339523442-j64ti20gb98ne55lrbpmmrtpcsi1mghn.apps.googleusercontent.com',
  firebaseConfig: {"projectId":"catnotes-bc632","appId":"1:364962378829:web:e05e25c6a7ca986ce85804","storageBucket":"catnotes-bc632.firebasestorage.app","apiKey":"AIzaSyBckcUhc-VqpIzYJ9bae_LYL65PZ8At2kU","authDomain":"catnotes-bc632.firebaseapp.com","messagingSenderId":"364962378829"},
  vapidKey: 'BCMMLj3TJYs8yjdbQswRStJEX3el6-B9VtLSqzBxPFZVQ0HDUhtvlR__vqIK3TZLsTUoG6Mr8381E24oZcK3YSU'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
