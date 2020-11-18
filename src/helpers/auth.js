import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {firebase} from '@react-native-firebase/auth';


export async function fbLogin() {

  let data, error;
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.grantedPermissions.length) {
      const fb_data = await AccessToken.getCurrentAccessToken();
      if (fb_data) {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          fb_data.accessToken,
        );

        const user = await firebase.auth().currentUser;
        console.info('USER DATA', user);
        if (user) {
          data = {
            email: user.email,
            name: user.displayName,
            photo:user.photoURL,
            token: await user.getIdToken(),
          };
        } else {
          data = {
            user_id: fb_data.userID,
            token: credential.token,
          };
        }
      }
    } else {
      error = {
        message: 'ERROR LOGIN!',
      };
    }
  } catch (err) {
    error = {message: err.message};
  }

  return {data, error};
}

export async function googleLogin() {
  let data, error;

  try {
    await GoogleSignin.hasPlayServices();
    const {idToken, serverAuthCode} = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      serverAuthCode,
    );
    
    const status = await firebase.auth().signInWithCredential(credential);
    
    const token = await firebase.auth().currentUser.getIdToken();
    if (token) {
      data = {
        email: status.user.email,
        name: status.user.displayName,
        photo:status.user.photoURL,
        token,
      };
    }
  } catch (err) {
    error = {message: err.message};
  }

  return {data, error};
}
