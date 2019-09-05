const getRequestFunc = method => (url = '', data) => fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: data || null,
});

export const get = getRequestFunc('GET');
export const post = getRequestFunc('POST');
