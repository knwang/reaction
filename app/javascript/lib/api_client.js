import axios from 'axios';

const BOARDS_INDEX_URL = '/api/boards';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

const apiClient = {
  getBoards: function(callback) {
    return axios.get(BOARDS_INDEX_URL)
      .then(checkStatus)
      .then(response => response.data)
      .then(callback);
  }
};

export default apiClient;
