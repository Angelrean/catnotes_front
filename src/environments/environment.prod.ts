export const environment = {
  production: true,
  api_uri: 'https://catnotes-back-production.up.railway.app/api/',
  auth_config: {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: '512339523442-j64ti20gb98ne55lrbpmmrtpcsi1mghn.apps.googleusercontent.com',
    redirectUri: window.location.origin+ "/calendar",
    scope: 'openid profile email',
  }
};
