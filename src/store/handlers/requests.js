import {fetchRequest} from 'helpers/network';

export const createRequest = (state, setState) => async (cb) => {
  const res = await fetchRequest(
    `/request/${state.user.data.id}`,
    state.user.token,
    {},
  );
  if (res.data) {
    alert(res.data.message);
    if (cb) {
      cb();
    }
  } else {
    alert(`ERROR REQUESTING.. ${res.error.message}`);
  }
};

export const rejectRequest = (state, setState) => async (id, cb) => {
  const res = await fetchRequest(`/request/reject/${id}`, state.user.token);
  if (res.data) {
    alert('REJECTED REQUEST!');
    if (cb) {
      cb();
    }
  } else {
    alert(`ERROR REJECTED REQUESTING.. ${res.error.message}`);
  }
};

export const approveRequest = (state, setState) => async (id, cb) => {
  const res = await fetchRequest(`/request/approve/${id}`, state.user.token);
  if (res.data) {
    alert('APPROVED REQUEST!');
    if (cb) {
      cb();
    }
  } else {
    alert(`ERROR APPROVED REQUESTING.. ${res.error.message}`);
  }
};
