import {fetchRequest} from 'helpers/network';
import {Alert} from 'react-native';
export const createMeeting = (state, setState) => async (values, cb) => {
  values.requester_id = state.user.data.id;
  const res = await fetchRequest('meeting', state.user.token, values);
  if (res.error) {
    alert(`ERROR CREATING MEETING...${res.error.message}`);
    console.info('CREATING MEETING ERROR', res);
  } else {
    alert('MEETING CREATED SUCCESFULLY...!');
    if (cb) {
      cb();
    }
  }
};

export const getMeeting = (state, setState) => async (cb) => {
  const res = await fetchRequest('meeting', state.user.token);
  let meetings = state.user.meetings,
    durations = state.durations;
  if (res.error) {
    alert(`ERROR MEETING  ${res.error.message}`);
    console.info('FETCHING MEETING ERROR', res);
  } else {
    console.info('MEETING RESPONSE DATA', res.data);
    meetings = res.data;
  }

  const slot_res = await fetchRequest('duration', state.user.token);
  if (slot_res.error) {
   alert(`ERROR SLOTS  ${slot_res.error.message}`);
    console.info('FETCHING SLOTS ERROR', res);
  } else {
    console.info('RESPONSE DATA', slot_res.data);
    durations = slot_res.data;
  }

  if (cb) {
    cb({meetings, durations});
  }

  setState({...state, durations, user: {...state.user, meetings}});
};

export const getUserMeeting = (state, setState) => async (cb) => {
  const {id} = state.user.data;
  console.info('TOEKN DAATA', state);
  const res = await fetchRequest(`/meeting/${id}`, state.user.token);
  if (res.error) {
    alert(`ERROR MEETING  ${res.error.message}`);
    console.info('GETTING USER MEETING ERROR', res);
  } else {
    console.info('RESPONSE DATA', res.data);
    if (cb) {
      cb(true);
      setState({...state, meetings: res.data});
    }
  }
  if (cb) {
    cb();
  }
};

export const deleteMeeting = (state, setState) => async (id, cb) => {
  const res = await fetchRequest(
    `/meeting/${id}`,
    state.user.token,
    {},
    'delete',
  );
  if (res.error) {
    alert(`ERROR DELETING USER MEETING... ${res.error.message}`);
    console.info('DELETING USER MEETING ERROR', res);
  } else {
    alert('MEETING DELETED...');
    console.info('RESPONSE DATA', res.data);
    if (cb) {
      cb(true);
    }
  }
};
