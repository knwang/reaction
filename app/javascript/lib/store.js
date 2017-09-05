import { createStore as cs, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import newBoardFormReducer from '../reducers/NewBoardFormReducer';
import boardsReducer from '../reducers/BoardsReducer';

function reducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    newBoardForm: newBoardFormReducer(state.newBoardForm, action)
  };
}

export function createStore() {
  return cs(reducer, applyMiddleware(ReduxThunk));
}
