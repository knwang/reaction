import axios from 'axios';

const BOARDS_INDEX_URL = '/api/boards';

const apiClient = {
  getBoards: function(callback) {
    return axios.get(BOARDS_INDEX_URL)
      .then(response => response.data)
      .then(callback);
  }
};

export default apiClient;
