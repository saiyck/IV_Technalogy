import {fetchRequest} from 'helpers/network';

export const addSlot = (state, setState) => async (values, cb) => {
  const res = await fetchRequest('duration', state.user.token, values);
  if (res.error) {
    alert(res.error.message);
    console.info('CREATING NEWS ERROR', res);
  } else {
    alert('SLOT CREATED SUCCESFULLY...!');
    if (cb) {
      cb(true);
    }
  }
};