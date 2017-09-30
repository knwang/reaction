import apiClient from '../lib/ApiClient';
import * as types from '../constants/ActionTypes';

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(boardId, list) {
  return { type: types.CREATE_LIST_SUCCESS, boardId, list };
}

export function updateListRequest() {
  return { type: types.UPDATE_LIST_REQUEST };
}

export function updateListSuccess(boardId, listId, updatedList) {
  return { type: types.UPDATE_LIST_SUCCESS, boardId, listId, updatedList };
}

export function createList(boardId, list, callback) {
  return function(dispatch) {
    dispatch(createListRequest());
    apiClient.createList(boardId, list, newList => {
      dispatch(createListSuccess(boardId, newList))

      if (callback) { callback(newList); }
    });
  }
}

export function updateList(boardId, listId, data) {
  return function(dispatch) {
    dispatch(updateListRequest());
    apiClient.updateList(boardId, listId, data, updatedList => {
      dispatch(updateListSuccess(boardId, listId, updatedList));
    });
  }
}
