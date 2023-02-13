export const API_URL = 'https://eve.idfy.com/v3/tasks/sync/extract/';

export const FILE_UPLOAD_API_URL = 'https://jsonplaceholder.typicode.com';

// import DeviceInfo from 'react-native-device-info';
import {store} from '../redux/store';

const fetch = window.fetch;

export default async function callApi(endpoint, method = 'get', body) {
  // const token = store.getState().appReducer.token;

  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'account-id':"60b543440b4d/a2b3b60b-a4f5-4b40-a6e8-bf24ccf66345",
      'api-key':"c8122405-7c09-4427-8917-5fa430b3130c"
    },
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(' url   ', `${API_URL}/${endpoint}`);
  return fetch(`${API_URL}/${endpoint}`, options)
    .then(response =>
      response.json().then(data => ({status: response.status, ...data})),
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
}
