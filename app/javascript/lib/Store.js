import { createStore as cs, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import newListFormReducer from '../reducers/NewListFormReducer';
import boardsReducer from '../reducers/BoardsReducer';
import listsReducer from '../reducers/ListsReducer';
import statusReducer from '../reducers/StatusReducer';
import cardsReducer from '../reducers/CardsReducer';

function reducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action),
    lists: listsReducer(state.lists, action),
    newListForm: newListFormReducer(state.newListForm, action),
    status: statusReducer(state.status, action),
    cards: cardsReducer(state.cards, action)
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export function createStore(initialState = {}) {
  return cs(reducer, initialState, composeEnhancers(applyMiddleware(ReduxThunk)));
}
