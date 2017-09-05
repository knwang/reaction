import apiClient from '../lib/ApiClient';
import * as types from '../constants/ActionTypes';

function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, board: board };
}

export function fetchBoards() {
  return function(dispatch) {
    dispatch(fetchBoardsRequest());
    apiClient.getBoards(boards => dispatch(fetchBoardsSuccess(boards)));
  };
}

export function createBoard(board) {
  return function(dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(board, newBoard => dispatch(createBoardSuccess(newBoard)))
  }
}
