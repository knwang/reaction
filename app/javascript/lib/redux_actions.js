import apiClient from './api_client';

export const FETCH_BOARDS_REQUEST = 'FETCH_BOARDS_REQUEST';
function fetchBoardsRequest() {
  return { type: FETCH_BOARDS_REQUEST };
}

export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
function fetchBoardsSuccess(boards) {
  return { type: FETCH_BOARDS_SUCCESS, boards };
}

export function fetchBoards() {
  return function(dispatch) {
    dispatch(fetchBoardsRequest());
    return apiClient.getBoards()
      .then(boards => dispatch(fetchBoardsSuccess(boards)))
  };
}
