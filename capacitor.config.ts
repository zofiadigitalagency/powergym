import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.powergym.pescara',
  appName: 'PowerGym Pescara',
  webDir: 'dist',
  server: {
    url: 'https://875cad10-5dde-4092-8ad9-b2f9c567a27a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0f172a",
      showSpinner: false,
    },
  },
};

export default config;
