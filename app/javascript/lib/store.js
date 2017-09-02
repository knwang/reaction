import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

function reducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action)
  };
}

function boardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARDS_SUCCESS') {
    return action.boards;
  } else {
    return state;
  }
}

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
