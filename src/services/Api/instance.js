import axios from 'axios';
import perf from '@react-native-firebase/perf';
// import Qs from 'qs';
import {store} from '../../store';
// import storage from '../storage';
import config from '../../config/config';

export const instance = axios.create({
  baseURL: config.apiUrl,
  responseType: 'json',
  headers: {
    'User-Agent': 'iosAndroid',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With',
    Accept: 'application/json',
    // session: store.getState().auth.token,
    timeout: 10000,
  },
  // paramsSerializer: function (params) {
  //   return Qs.stringify(params, { arrayFormat: 'brackets' });
  // },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

instance.interceptors.request.use(async reqConfig => {
  try {
    const httpMetric = perf().newHttpMetric(reqConfig.url, reqConfig.method);
    reqConfig.metadata = {httpMetric};

    // add any extra metric attributes, if required
    // httpMetric.putAttribute('userId', '12345678');

    await httpMetric.start();
  } finally {
    return reqConfig;
  }
});

instance.interceptors.response.use(
  async response => {
    try {
      // Request was successful, e.g. HTTP code 200

      const {httpMetric} = response.config.metadata;

      // add any extra metric attributes if needed
      // httpMetric.putAttribute('userId', '12345678');

      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      return response;
    }
  },
  async error => {
    try {
      // Request failed, e.g. HTTP code 500

      const {httpMetric} = error.config.metadata;

      // add any extra metric attributes if needed
      // httpMetric.putAttribute('userId', '12345678');

      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      // Ensure failed requests throw after interception
      return Promise.reject(error);
    }
  },
);

export const setHeaderToken = userToken => {
  if (userToken) {
    instance.defaults.headers.common.session = userToken;
  }
};

const onSuccess = response => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = error => {
  console.debug('Request Failed:', error.config);
  return Promise.reject(error);
};

const request = async options => {
  let source;
  // const token = store.getState().auth.token;

  if (source) {
    source.cancel('Canceling previous request.');
  }

  source = axios.CancelToken.source();
  Object.assign(options, {cancelToken: source.token});

  try {
    // instance.defaults.headers.common.session = token;
    const response = await instance(options);
    return onSuccess(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error(`Cancelling previous request: ${error.message}`);
    }
    return onError(error);
  }
};

export default request;
