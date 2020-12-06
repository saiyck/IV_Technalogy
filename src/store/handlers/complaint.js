import {fetchRequest} from 'helpers/network';
import RNFetchBlob from 'rn-fetch-blob';

export const createComplaint = (state, setState) => async (values, cb) => {
  if (values.images && values.images.length) {
    values.images = values.images.map((img) => ({
      data: img.data,
      mime: img.mime,
    }));
  }
  const {video, audio, ...rest} = values;
  const res = await fetchRequest('complaint', state.user.token, rest);
  switch (values.type) {
    case 'video':
      if (res.data) {
        await fetchRequest(
          `/complaint/video/${res.data.complaint_id}`,
          state.user.token,
          [
            {
              name: 'video',
              filename: 'video.mp4',
              data: RNFetchBlob.wrap(video),
              type: 'video/mp4',
            },
          ],
          'post',
          true,
        );
      }
      break;
    case 'audio':
      if (res.data) {
        await fetchRequest(
          `/complaint/audio/${res.data.complaint_id}`,
          state.user.token,
          [
            {
              name: 'audio',
              filename: 'audio.wav',
              data: RNFetchBlob.wrap(audio),
              type: 'audio/wav',
            },
          ],
          'post',
          true,
        );
      }
      break;
    default:
    //   res = await fetchRequest("complaint", "", values, "post", false);
  }
  if (res.data) {
    alert('COMPLAINT CREATED');
    if (cb) {
      cb();
    }
    console.info('DATA', res.data);
  } else {
    alert(`ERROR CREATING COMPLAINT ${res.error.message}!`);
    console.info('COMPLAINT ERROR', res.error);
  }
};

export const getUserComplaints = (state, setState) => async (cb) => {
  const {id} = state.user.data;
  const res = await fetchRequest(`/complaint/${id}`, state.user.token);
  if (res.error) {
    alert(`PLEASE UPDATE KYC... ${res.error.message}`);
    console.info('FETCHING COMPLAINTS ERROR', res);
  } else {
    setState({...state, complaints: res.data});
    if (cb) {
      cb(true);
    }
  }
};
export const getComplaints = (state, setState) => async (cb) => {
  const res = await fetchRequest('complaint', state.user.token);
  if (res.error) {
    alert(`ERROR FETCHING COMPLAINTS... ${res.error.message}`);
    console.info('FETCHING COMPLAINTS ERROR', res);
  } else {
    setState({...state, user: {...state.user, complaints: res.data}});
    if (cb) {
      cb(true);
    }
  }
};
