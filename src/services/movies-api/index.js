import 'whatwg-fetch';
import qs from 'querystring';

import CONFIG from '../../config';

const API_BASE = 'https://api.themoviedb.org/3';

function formatRequestUrl(path, params) {
  const query = qs.stringify({...params, api_key: CONFIG.TMDB_API_KEY});
  return `${API_BASE}${path}?${query}`;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default {
  get(path, params) {
    return fetch(formatRequestUrl(path, params))
      .then(checkStatus)
      .then(parseJSON);
  },
};
