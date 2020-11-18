import {base_url} from 'globals/constants';
import RNFetchBlob from 'rn-fetch-blob';

const urls = {
  login: '/auth/login',
  news: '/news',
  duration: '/duration',
  complaint: '/complaint',
  request: '/request',
  comments: '/comments',
  user: '/user',
  otp: '/auth/otp',
  verify: '/auth/verify',
  video: '/complaint/video',
  meeting: '/meeting',
};

export async function uploadImage({article_id, img_data}) {
  let data = null,
    error = null;

  try {
    const req_url = `${base_url}${urls.upload}${article_id}`;
    const formdata = new FormData();
    formdata.append('image', img_data.originFileObj, img_data.name);

    const request_opts = {
      method: 'post',
      body: formdata,
    };

    const response = await fetch(req_url, request_opts).then((res) =>
      res.json(),
    );

    if (response.data) {
      data = response.data;
    }
    if (response.error) {
      error = response.error;
    }
  } catch (err) {
    error = {message: err.message};
  }

  return {data, error};
}

export async function fetchRequest(
  url_type,
  token,
  body,
  req_method,
  is_form_data = false,
) {
  let data = null,
    error = null;
  try {
    let url = urls[url_type] ? urls[url_type] : url_type;
    url = base_url + url;
    const method = req_method ? req_method : body ? 'post' : 'get';
    const req_params = {method};

    if (!is_form_data && method === 'post') {
      req_params.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else if (is_form_data) {
      req_params.headers = {
        'Content-Type':
          'multipart/form-data; boundary=someArbitraryUniqueString',
      };
    }

    if (token) {
      req_params.headers = {
        ...req_params.headers,
        authorization: token,
      };
    }
    if (method !== 'get' && method !== 'head' && method !== 'delete') {
      if (is_form_data) {
        console.info('BODY', body);
      }
      req_params.body = is_form_data ? body : JSON.stringify(body);
    }

    let response;

    if (is_form_data) {
      response = await RNFetchBlob.fetch(
        req_params.method,
        url,
        req_params.headers,
        body,
      );
    } else {
      // console.info('REQUEST URL', url);
      // console.info('REQ PARAMS', req_params);
      response = await fetch(url, req_params).then((res) => res.json());
    }

    if (response.data) {
      data = response.data;
    } else {
      data = response;
    }
    if (response.error) {
      console.info('RESPNOSE ERROR', response);
      error = response.error;
    }
  } catch (err) {
    console.info('TOTAL ERROR', err);
    error = {message: err.message};
  }

  return {data, error};
}
