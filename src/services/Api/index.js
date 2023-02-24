import request, { setHeaderToken } from './instance';
import { store } from '../../store';

export default class Api {
  static get(url, params = {}, config = {}) {
    const token = store.getState().auth.token;
    setHeaderToken(token);

    return request({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  static post(url, data, config = {}) {
    const token = store.getState().auth.token;
    setHeaderToken(token);

    return request({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  static patch(url, data, config = {}) {
    const token = store.getState().auth.token;
    setHeaderToken(token);

    return request({
      url,
      method: 'PATCH',
      data,
      ...config,
    });
  }

  static put(url, data, config = {}) {
    const token = store.getState().auth.token;
    setHeaderToken(token);

    return request({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  static delete(url, config = {}) {
    const token = store.getState().auth.token;
    setHeaderToken(token);

    return request({
      url,
      method: 'DELETE',
      ...config,
    });
  }
}
