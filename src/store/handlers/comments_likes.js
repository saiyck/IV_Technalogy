import {fetchRequest} from 'helpers/network';

export const getCommentsLikes = (state, setState) => async (id, cb) => {
  let comments = [],
    likes = [];
  const res = await fetchRequest(`/comments/${id}`, state.user.token);
  if (res.data) {
    comments = res.data;
  } else {
    alert(`ERROR COMMENTS.. ${res.error.message}`);
  }

  const likes_res = await fetchRequest(`/likes/${id}`, state.user.token);
  if (res.data) {
    likes = likes_res.data;
  } else {
    alert(`ERROR COMMENTS.. ${res.error.message}`);
  }

  return cb({likes, comments});
};

export const toggleLike = (state, setState) => async (news_id, cb) => {
  const res = await fetchRequest('/likes', state.user.token, {
    news_id,
    user_id: state.user.data.id,
  });

  if (res.data) {
    // alert(res.data.message);
  } else {
    alert('ERROR LIKING!');
  }

  if (cb) {
    cb();
  }
};

export const deleteComment = (state, setState) => async (id, cb) => {
  const res = await fetchRequest(
    `/comments/${id}`,
    state.user.token,
    null,
    'delete',
  );
  if (res.data) {
    alert('COMMENT DELETED!');
  } else {
    alert('ERROR DELETING COMMENT!');
  }
  if (cb) {
    cb();
  }
};

export const createComment = (state, setState) => async (values, cb) => {
  values.user_id = state.user.data.id;
  const res = await fetchRequest('comments', state.user.token, values);
  if (res.data) {
    alert('COMMENT CREATED!');
  } else {
    alert('ERROR CREATING COMMENT!');
  }
  if (cb) {
    cb();
  }
};
