import config from '../config/config';
import {store} from '../redux/store';
import ApiErrorHandler from './ApiErrorHandler';
export const API_URL = config.apiUrl;

const fetch = window.fetch;

export default async function callApi(endpoint, method = 'get', body) {
  const token = store.getState().appReducer.token;

  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      session: `${token}`,
      'account-id': `${config?.accountId}`,
      'api-key': `${config?.apiKey}`,
    },
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log('====================================');
  console.log(' url   ', `${API_URL}/${endpoint}`);
  console.log('====================================');
  return fetch(`${API_URL}/${endpoint}`, options)
    .then(response =>
      response.json().then(data => ({status: response.status, ...data})),
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      ApiErrorHandler.selectMessage(err);
      console.error(err);
    });
}
