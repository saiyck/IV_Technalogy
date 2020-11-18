import {firebase} from '@react-native-firebase/auth';

export const checkLoggedIn = async () => {
  const loggedIn = Boolean(firebase.auth().currentUser);
  return {loggedIn};
};
