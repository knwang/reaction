import apiClient from './api_client';

export const FETCH_BOARDS_REQUEST = 'FETCH_BOARDS_REQUEST';
function fetchBoardsRequest() {
  return { type: FETCH_BOARDS_REQUEST };
}

export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS';
function fetchBoardsSuccess(boards) {
  return { type: FETCH_BOARDS_SUCCESS, boards };
}

export const CREATE_BOARD_REQUEST = 'CREATE_BOARD_REQUEST';
function createBoardRequest() {
  return { type: CREATE_BOARD_REQUEST };
}

export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS';
function createBoardSuccess(board) {
  return { type: CREATE_BOARD_SUCCESS, board: board };
}

export const SHOW_CREATE_BOARD_FORM = 'SHOW_CREATE_BOARD_FORM';
export function showCreateBoardForm() {
  return { type: SHOW_CREATE_BOARD_FORM };
}

export const HIDE_CREATE_BOARD_FORM = 'HIDE_CREATE_BOARD_FORM';
export function hideCreateBoardForm() {
  return { type: HIDE_CREATE_BOARD_FORM };
}

export const UPDATE_CREATE_BOARD_FORM_INPUT_TEXT = 'UPDATE_CREATE_BOARD_FORM_INPUT_TEXT';
export function updateCreateBoardFormInputText(text) {
  return { type: UPDATE_CREATE_BOARD_FORM_INPUT_TEXT, text };
}

export const CLEAR_STORE_DATA = 'CLEAR_STORE_DATA';
export function clearStoreData() {
  return { type: CLEAR_STORE_DATA };
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
