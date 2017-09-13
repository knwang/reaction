import apiClient from '../lib/ApiClient';
import * as types from '../constants/ActionTypes';

export function fetchListsRequest() {
  return { type: types.FETCH_LISTS_REQUEST };
}

export function fetchListsSuccess(boardId, lists) {
  return { type: types.FETCH_LISTS_SUCCESS, boardId, lists };
}

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(boardId, list) {
  return { type: types.CREATE_LIST_SUCCESS, boardId, list };
}

export function fetchLists(boardId) {
  return function(dispatch) {
    dispatch(fetchListsRequest());
    apiClient.getLists(boardId, lists => {
      dispatch(fetchListsSuccess(boardId, lists))
    });
  }
}

export function createList(boardId, list) {
  return function(dispatch) {
    dispatch(createListRequest());
    apiClient.createList(boardId, list, newList => {
      dispatch(createListSuccess(boardId, newList))
    });
  }
}
