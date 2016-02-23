import {api} from 'config';

const serialize = data => {
  return Object.keys(data).map(key => {
    const value = data[key];

    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
};

const getAccessData = () => {
  const access_token = localStorage.getItem('accessToken');
  if (access_token) {
    return {access_token};
  }
  return {};
};

const addDataToPath = (path, data) => {
  if (Object.keys(data).length > 0) {
    const st = path.indexOf('?') === 0 ? '&' : '?'
    return path + st + serialize(data);
  }
  return path;
};

const request = {
  get(path, data) {
    data = Object.assign(data || {}, getAccessData());
    path = addDataToPath(path, data);

    return fetch(api.root + api.base + path).then(r => r.json());
  },
  post(path) {
    path = addDataToPath(path, getAccessData());

    return fetch(api.root + api.base + path, {method: 'post'});
  }
};

export default request;
