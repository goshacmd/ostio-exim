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

const request = {
  get(path, data) {
    data = Object.assign(data || {}, getAccessData());
    if (Object.keys(data).length > 0) {
      const st = path.indexOf('?') === 0 ? '&' : '?'
      path = path + st + serialize(data);
    }

    return fetch(api.root + api.base + path).then(r => r.json());
  }
};

export default request;
