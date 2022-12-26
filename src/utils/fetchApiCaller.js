export const API_URL = 'https://jsonplaceholder.typicode.com';
import {store} from '../redux/store';
export default async function callApi(endpoint, method = 'GET', body) {
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
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
