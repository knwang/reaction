import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

function reducer(state, action) {
  if (action.type === 'CLEAR_STORE_DATA') {
    state = undefined;
  }

  return appReducer(state, action);
};

function appReducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    newBoardForm: newBoardFormReducer(state.newBoardForm, action)
  };
}

const defaultNewBoardFormState = {
  display: false,
  title: ''
};

function newBoardFormReducer(state = defaultNewBoardFormState, action) {
  if (action.type === 'SHOW_CREATE_BOARD_FORM') {
    return {
      ...state,
      display: true
    };
  } else if (action.type === 'HIDE_CREATE_BOARD_FORM') {
    return {
      ...state,
      display: false
    };
  } else if (action.type === 'UPDATE_CREATE_BOARD_FORM_INPUT_TEXT') {
    return {
      ...state,
      title: action.text
    };
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    return {
      ...state,
      title: '',
      display: false
    };
  } else {
    return state;
  }
}

function boardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARDS_SUCCESS') {
    return action.boards;
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    const newBoard = action.board;
    newBoard.id = Number(newBoard.id);

    return state.concat(newBoard);
  } else {
    return state;
  }
}

export default createStore(reducer, applyMiddleware(ReduxThunk));
