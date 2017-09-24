import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient';
jest.mock('../lib/ApiClient');

import * as actions from '../actions/CardActions';
import * as types from '../constants/ActionTypes';

describe("CardActions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
    store.clearActions()
  });

  describe("createCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createCardRequest()
      ).toEqual({ type: types.CREATE_CARD_REQUEST });
    });
  });

  describe("createCardSuccess", () => {
    it("returns the correct object", () => {
      expect(
        actions.createCardSuccess({ id: 1 })
      ).toEqual({ type: types.CREATE_CARD_SUCCESS, card: { id: 1 } });
    });
  });

  describe("action creators", () => {
    let storeActions;

    describe("createCard", () => {
      const newCard = { title: "My card" };
      const newCardWithId = { id: 1, title: "My card" }
      const cb = jest.fn();

      beforeEach(() => {
        store.dispatch(actions.createCard(1, newCard, cb));

        const invocationArgs = apiClient.createCard.mock.calls[0];
        const callback = invocationArgs[2];

        callback(newCardWithId);
        storeActions = store.getActions();
      });

      afterEach(() => {
        cb.mockClear();
      });

      it("dispatches createCardRequest", () => {
        expect(
          storeActions[0]
        ).toEqual(actions.createCardRequest());
      });

      it("dispatches createCardSuccess with the new card", () => {
        expect(
          storeActions[1]
        ).toEqual(actions.createCardSuccess(newCardWithId));
      });

      it("calls the callback if one is provided", () => {
        expect(cb).toHaveBeenCalledWith(newCardWithId);
      });
    });
  });
});
