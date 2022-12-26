import axios from 'axios';
import {store} from '../store/appStore';
export const API_URL = 'https://jsonplaceholder.typicode.com';
export default async function axiosCaller(endpoint, method = 'GET', body) {
  const token = store.getState().appReducer.token;
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `${token}`,
    },
    method,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await axios(`${API_URL}/${endpoint}`, options);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
