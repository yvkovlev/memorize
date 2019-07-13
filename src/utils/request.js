function getRequestFunc(method) {
  return function (url = '', data = {}) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
}

export default {
  get: getRequestFunc('GET'),
  post: getRequestFunc('POST'),
};
