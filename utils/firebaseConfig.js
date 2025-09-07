
function getFirebaseConfig(appName) {
  const appIds = {
    // proForecastPanel: process.env.FIREBASE_APP_ID_PRO_FORECAST_PANEL,
    lottoforecastWebApp: process.env.FIREBASE_APP_ID_LOTTO_FORECAST_WEB_APP,
    basicUserWebApp: process.env.BASIC_USER_WEB_FIREBASE_APP_ID,
    default: process.env.FIREBASE_APP_ID
  };

  const measurementIds = {
    // proForecastPanel: process.env.FIREBASE_MEASUREMENT_ID_PRO_FORECAST_PANEL,
    lottoforecastWebApp: process.env.FIREBASE_MEASUREMENT_ID_LOTTO_FORECAST_WEB_APP,
    basicUserWebApp: process.env.BASIC_USER_WEB_FIREBASE_MEASUREMENT_ID,
    default: process.env.FIREBASE_MEASUREMENT_ID
  }

  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: appIds[appName] || appIds.default,
    measurementId: measurementIds[appName] || measurementIds.default
  }
  
}

module.exports = { getFirebaseConfig };