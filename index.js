/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';
import {GoogleSignin} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';

import {web_client_id} from 'globals/constants';

enableScreens();

GoogleSignin.configure({
  webClientId: web_client_id,
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

// HASH COMMAND
// keytool -exportcert -alias androiddebugkey -keystore C:\Users\Droidmakk.MAKKSWIN\Projects\certitude\mobile_app\android\app\debug.keystore | C:\openssl\bin\openssl sha1 -binary | C:\openssl\bin\openssl base64

// SHA-1 GENERATE
// keytool -list -v -keystore C:\Users\Droidmakk.MAKKSWIN\Projects\certitude\mobile_app\android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android
