import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.catnote',
  appName: 'CatNotes',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: '512339523442-j64ti20gb98ne55lrbpmmrtpcsi1mghn.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    }

};

export default config;
