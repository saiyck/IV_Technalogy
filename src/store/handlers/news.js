import {fetchRequest} from 'helpers/network';

export const createNews = (state, setState) => async (values, cb) => {
  const res = await fetchRequest('news', state.user.token, values);
  if (res.error) {
    alert('ERROR CREATING NEWS...');
    console.info('CREATING NEWS ERROR', res);
  } else {
    alert('NEWS CREATED SUCCESFULLY...!');
    if (cb) {
      cb(true);
    }
  }
};

export const getNews = (state, setState) => async (cb) => {
  let news = state.news,
    user_data = state.user.data,
    token = state.token;
  const res = await fetchRequest('news');
  if (res.error) {
    alert('ERROR CREATING NEWS...');
    console.info('CREATING NEWS ERROR', res);
  } else {
    console.info('NEWWSLIST', res.data);
    news = res.data;
    if (cb) {
      cb(res.data);
    }
  }

  // if (!token) {
  //   const data = await AsyncStorage.multiGet([
  //     storage_items.user_data,
  //     storage_items.token,
  //   ]);
  //   if (data[0][1] && data[1][1]) {
  //     token = data[1][1];
  //     user_data = JSON.parse(data[0][1]);
  //   }
  // }

  setState({...state, news});
};

export const getAllNews = (state, setState) => async (cb) => {
  const {id} = state.user.data;
  // const res = await fetchRequest(`/news/${id}`, state.user.token);
  const res = await fetchRequest('/news', state.user.token);
  if (res.error) {
    alert('ERROR GETTING USER NEWS!');
    console.info('GETTING USER NEWS ERROR', res);
  } else {
    console.info('RESPONSE DATA', res.data);
    if (cb) {
      cb(true);
      setState({...state, user: {...state.user, news: res.data}});
    }
  }
  if (cb) {
    cb();
  }
};

export const deleteNews = (state, setState) => async (id, cb) => {
  const res = await fetchRequest(`/news/${id}`, state.user.token, {}, 'delete');
  if (res.error) {
    alert('ERROR DELETING USER NEWS...');
    console.info('DELETING USER NEWS ERROR', res);
  } else {
    console.info('RESPONSE DATA', res.data);
    if (cb) {
      cb(true);
    }
  }
};
