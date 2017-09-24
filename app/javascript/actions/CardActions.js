import apiClient from '../lib/ApiClient';
import * as types from '../constants/ActionTypes';

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(newCard) {
  return {
    type: types.CREATE_CARD_SUCCESS,
    card: newCard
  };
}

export function createCard(listId, card, callback) {
  return function(dispatch) {
    dispatch(createCardRequest());
    apiClient.createCard(listId, card, (newCard) => {
      dispatch(createCardSuccess(newCard));
      callback(newCard);
    });
  }
}
