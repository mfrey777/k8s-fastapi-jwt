import axios from 'axios';
import store from '../redux/store';

import {
  refreshTokenRequest,
  refreshTokenSuccess,
  logout,
} from '../redux/user/user.actions';

export const api = axios.create({
  baseURL: '',
  responseType: 'json',
});

export const api_refresh = axios.create({
  baseURL: '',
  responseType: 'json',
});

// declare a request interceptor
api.interceptors.request.use(
  (config) => {
    // perform a task before the request is sent
    // console.log('Request was sent');
    const { user } = store.getState();
    // console.log('api interceptor: accessToken: ' + user.accessToken);
    if (user.accessToken !== '') {
      config.headers.Authorization = 'Bearer ' + user.accessToken;
    }

    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

// 401 retry based on:
// https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise

function refreshToken(): Promise<boolean> {
  // console.log('refeshToken function started');
  // get user sub-store
  const { user } = store.getState();
  // console.log('refreshToken: user: ' + user.currentUser);
  if (user.isRefreshing && user.currentUser !== '') {
    return user.refreshingCall;
  }

  store.dispatch(refreshTokenRequest({ msg: '' }));

  const headers = {
    Authorization: 'Bearer ' + user.refreshToken,
  };
  const refreshingCall = api_refresh
    // .post('/' + user.tenant + '/api/auth/refresh', null, { headers: headers })
    .post('/api/auth/refresh', null, { headers: headers })
    .then(({ data: { access_token: token } }) => {
      store.dispatch(refreshTokenSuccess({ accessToken: token }));
      return Promise.resolve(true);
    })
    .catch(() => {
      // store.dispatch(logout({ tenant: user.tenant }));
      store.dispatch(logout());
      return Promise.resolve(false);
    });
  return refreshingCall;
}

// declare a response interceptor
api.interceptors.response.use(
  (response) => {
    // do something with the response data
    // console.log('Response was received');
    return response;
  },
  (error) => {
    // console.log('Response was received, error occured');
    // handle the response error 401 or 500
    // if (error.response.status === 401 || error.response.status === 500) {
    if (error.response.status === 401) {
      // console.log('error code is 401');
      // console.log(error.response);

      const { user } = store.getState();
      if (user.currentUser === '') {
        // TODO - error not working
        // return { msg: 'error' };
        return error.response;
      } else {
        return refreshToken().then((_) => {
          const { user } = store.getState();
          // console.log('access token: ' + user.accessToken);
          error.config.headers['Authorization'] = 'Bearer ' + user.accessToken;
          error.config.baseURL = undefined;
          // return api_refresh.request(error.config);
          try {
            const response = api_refresh.request(error.config);
            return response;
          } catch (err) {
            console.log('refresh token error occured');
            return err.response;
          }
        });
      }
    }
    // Return message and not error to component
    return error.response;
  }
);
