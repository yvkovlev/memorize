import { get } from 'utils/request';

const { REACT_APP_ENV } = process.env;
const reqUrl = REACT_APP_ENV === 'dev'
  ? 'http://localhost:9000/vk-app-memorize/europe-west1/api/token'
  : 'https://europe-west1-vk-app-memorize.cloudfunctions.net/api/token';

export const getToken = (uid) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.append('uid', uid);

  return get(`${reqUrl}?${queryParams.toString()}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Unable to retrieve token');
    })
    .catch((err) => {
      throw new Error(err);
    });
};
