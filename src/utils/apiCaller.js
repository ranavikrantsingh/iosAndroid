export const API_URL = 'https://partnerapi.honc.io';
// export const API_URL = 'https://devpartnerapi.honc.io';
import React from 'react';
// const API_URL = 'http://13.233.193.184:5201';
// const API_URL = 'http://13.233.193.184:5021';
// const API_URL = 'http://192.168.0.129:5021';
// export const API_URL = 'http://devapi.honc.io:5021';
export const FILE_UPLOAD_API_URL = 'https://api.honc.io'
// export const FILE_UPLOAD_API_URL = 'https://devapi.honc.io'
import DeviceInfo from 'react-native-device-info';
import {store} from '../../src/redux/store';


const fetch = window.fetch;

export default async function callApi(endpoint, method = 'get', body) {

  const token = store.getState().partnerReducer.token
 
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceid: `${DeviceInfo.getModel()}`,
      authorization: `${token}`
    },
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(' url   ', `${API_URL}/${endpoint}`);
  return fetch(`${API_URL}/${endpoint}`, options)
    .then(response => response.json().then(data => ({status: response.status,...data})))
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
}
