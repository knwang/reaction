import axios from 'axios';
import * as routes from '../constants/ApiRoutes';

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

const apiClient = {
  getBoards: function(callback) {
    return axios.get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(boardId, callback) {
    return axios.get(routes.boardUrl(boardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios.post(routes.CREATE_BOARD_URL, { board })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(boardId, list, callback) {
    return axios.post(routes.CREATE_LIST_URL, { board_id: boardId, list })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(boardId, listId, updatedList, callback) {
    return axios.put(
      routes.updateListUrl(listId), { board_id: boardId, list: updatedList }
    )
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(listId, card, callback) {
    return axios.post(
      routes.CREATE_CARD_URL, { list_id: listId, card }
    )
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCard: function(cardId, callback) {
    return axios.get(routes.cardUrl(cardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  }
};

export default apiClient;
