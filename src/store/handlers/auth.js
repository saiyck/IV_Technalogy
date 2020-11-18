import AsyncStorage from '@react-native-community/async-storage';
import {fbLogin, googleLogin} from 'helpers/auth';
import {fetchRequest} from 'helpers/network';
import {storage_items} from 'constants';
import initialState from 'store/intialState';

export const login = (state, setState) => async (type, cb) => {
  let auth_res;
  switch (type) {
    case 'fb':
      const fb_res = await fbLogin();
      auth_res = fb_res;
      break;
    case 'google':
      const google_res = await googleLogin();
      auth_res = google_res;
      break;
    default:
  }

  if (auth_res.error) {
    alert('ERROR LOGGING IN...');
    console.info('AUTH ERROR', auth_res);
  } else {
    const res = await fetchRequest('login', null, auth_res.data);
    if (res.error) {
      alert('ERROR LOGGING IN...');
      console.info('LOGIN ERROR', res);
    } else {
      await AsyncStorage.multiSet([
        [storage_items.user_data, JSON.stringify(res.data.user_data)],
        [storage_items.token, JSON.stringify(res.data.token)],
      ]);
      setState({
        ...state,
        user: {...state.user, data: res.data.user_data, token: res.data.token},
      });
    }
    return cb(Boolean(!res.error));
  }
};

export const otpLogin = (state, setState) => async (values, cb) => {
  try {
    const res = await fetchRequest('otp', null, values);
    if (res.error) {
      alert(res.error.message);
    } else {
      if (cb) {
        cb(true);
      }
    }
  } catch (err) {
    alert('ERROR SENDING OTP!');
    console.info('ERROR OTP', err);
  }
};

export const verifyOtp = (state, setState) => async (values, cb) => {
  try {
    const res = await fetchRequest('verify', null, values);
    if (res.error) {
      console.info('RESPONSE ERROR', res);
      cb(true);
      alert(res.error.message);
    } else {
      await AsyncStorage.multiSet([
        [storage_items.user_data, JSON.stringify(res.data.user_data)],
        [storage_items.token, JSON.stringify(res.data.token)],
      ]);
      setState({
        ...state,
        user: {...state.user, data: res.data.user_data, token: res.data.token},
      });
      cb();
    }
  } catch (err) {
    alert('ERROR SENDING OTP!');
    console.info('ERROR OTP', err);
    cb(true);
  }
};

export const logout = (state, setState) => async (cb) => {
  try {
    await AsyncStorage.clear();
    setState(initialState);
    if (cb) {
      cb();
    }
  } catch (err) {
    console.info('ERROR LOGOUT', err);
  }
};
