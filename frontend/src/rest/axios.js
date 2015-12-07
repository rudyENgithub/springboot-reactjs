import axios from 'axios';
import history from 'router/history';

const setupAxiosInterceptors = () => {
  const onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  };
  const onResponseSucess = (response) => response;
  const onResponseError = (error) => {
    if (error.status == 403) {
      const currentPath = window.location.pathname;
      history.pushState({nextPathname: currentPath}, '/login');
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSucess, onResponseError);
};

export {
  setupAxiosInterceptors
};