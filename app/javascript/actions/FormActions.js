import * as types from '../constants/ActionTypes';

export function showCreateBoardForm() {
  return { type: types.SHOW_CREATE_BOARD_FORM };
}

export function hideCreateBoardForm() {
  return { type: types.HIDE_CREATE_BOARD_FORM };
}

export function updateCreateBoardFormInputText(text) {
  return { type: types.UPDATE_CREATE_BOARD_FORM_INPUT_TEXT, text };
}
