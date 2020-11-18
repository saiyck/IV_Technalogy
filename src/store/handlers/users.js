import AsyncStorage from '@react-native-community/async-storage';
import {fetchRequest} from 'helpers/network';
import {storage_items} from 'constants';

export const getUsersRequests = (state, setState) => async (cb) => {
  const res = await fetchRequest('user', state.user.token);
  let users = state.user.users,
    requests = state.user.requests;
  if (!res.error) {
    users = res.data;
  } else {
    alert(`ERROR GETTING USERS ${res.error.message}`);
    if (cb) {
      cb(false);
    }
  }

  const request_res = await fetchRequest('request', state.user.token);
  if (!request_res.error) {
    requests = request_res.data;
  } else {
    alert(`ERROR GETTING REQUESTS ${res.error.message}`);
  }

  cb();

  setState({...state, user: {...state.user, users, requests}});
};

export const updateLocalData = (state, setState) => async (values) => {
  state.user.data = {...state.user.data, ...values};
  setState({...state});
  await AsyncStorage.setItem(
    storage_items.user_data,
    JSON.stringify(state.user.data),
  );
};

export const updateUser = (state, setState) => async (id, patch, cb) => {
  const res = await fetchRequest(
    `/user/${id}`,
    state.user.token,
    patch,
    'post',
  );
  if (res.error) {
    if (res.error?.message) {
      alert(res.error.message);
    }
  } else {
    if (cb) {
      cb();
    }
    if (!patch.notification_id) {
      alert('USER UPDATED!');
    }
  }
};
