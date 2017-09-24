import { createStore as cs, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import newBoardFormReducer from '../reducers/NewBoardFormReducer';
import newListFormReducer from '../reducers/NewListFormReducer';
import boardsReducer from '../reducers/BoardsReducer';
import listsReducer from '../reducers/ListsReducer';
import statusReducer from '../reducers/StatusReducer';
import cardsReducer from '../reducers/CardsReducer';

function reducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    lists: listsReducer(state.lists, action),
    newBoardForm: newBoardFormReducer(state.newBoardForm, action),
    newListForm: newListFormReducer(state.newListForm, action),
    status: statusReducer(state.status, action),
    cards: cardsReducer(state.cards, action)
  };
}

export function createStore(initialState = {}) {
  return cs(reducer, initialState, applyMiddleware(ReduxThunk));
}
