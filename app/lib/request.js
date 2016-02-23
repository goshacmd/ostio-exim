const api = 'http://api.ost.io/v1';

const serialize = data => {
  return Object.keys(data).map(key => {
    const value = data[key];

    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
};

const request = {
  get(path, data) {
    if (data) {
      const st = path.indexOf('?') === 0 ? '&' : '?'
      path = path + st + serialize(data);
    }

    return fetch(api + path).then(r => r.json());
  }
};

export default request;
