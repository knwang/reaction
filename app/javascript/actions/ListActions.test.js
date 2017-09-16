import React from 'react';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient';
jest.mock('../lib/ApiClient');

import * as actions from './ListActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("List actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    apiClient.getLists.mockClear();
    apiClient.createList.mockClear();
    apiClient.updateList.mockClear();
    store.clearActions()
  });

  describe("fetchListsRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchListsRequest()
      ).toEqual({ type: types.FETCH_LISTS_REQUEST });
    });
  });

  describe("fetchListsSuccess", () => {
    it("returns the correct object", () => {
      expect (
        actions.fetchListsSuccess()
      ).toEqual({ type: types.FETCH_LISTS_SUCCESS });
    });
  });

  describe("createListRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createListRequest()
      ).toEqual({ type: types.CREATE_LIST_REQUEST });
    });
  });

  describe("createListSuccess", () => {
    it("returns the correct object", () => {
      expect(
        actions.createListSuccess(1, {})
      ).toEqual({ type: types.CREATE_LIST_SUCCESS, boardId: 1, list: {} })
    });
  });

  describe("updateListRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateListRequest()
      ).toEqual({ type: types.UPDATE_LIST_REQUEST });
    });
  });

  describe("updateListSuccess", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateListSuccess(1, 1, {})
      ).toEqual({
        type: types.UPDATE_LIST_SUCCESS,
        boardId: 1,
        listId: 1,
        updatedList: {}
      });
    });
  });

  describe("action creators", () => {
    let storeActions;

    describe("fetchLists", () => {
      const lists = [{ id: "1", title: "My list" }];

      beforeEach(() => {
        store.dispatch(actions.fetchLists(1));

        const invocationArgs = apiClient.getLists.mock.calls[0];
        const callback = invocationArgs[1];

        callback(lists);
        storeActions = store.getActions();
      });

      it("dispatches fetchListsRequest()", () => {
        expect(storeActions[0]).toEqual(actions.fetchListsRequest())
      });

      it("dispatches fetchListSuccess()", () => {
        expect(storeActions[1]).toEqual(actions.fetchListsSuccess(1, lists));
      });
    });

    describe("createList", () => {
      const newList = { title: "My list" };
      const newListWithId = { id: 1, title: "My list" }

      beforeEach(() => {
        store.dispatch(actions.createList(1, newList));

        const invocationArgs = apiClient.createList.mock.calls[0];
        const callback = invocationArgs[2];

        callback(newListWithId);
        storeActions = store.getActions();
      });

      it("dispatches createListRequest()", () => {
        expect(storeActions[0]).toEqual(actions.createListRequest());
      });

      it("dispatches createListSuccess()", () => {
        expect(storeActions[1]).toEqual(
          actions.createListSuccess(1, newListWithId)
        );
      });
    });

    describe("updateList", () => {
      const updatedList = { id: 1, title: "Updated list", position: 2.0 };

      beforeEach(() => {
        store.dispatch(actions.updateList(1, 1, updatedList));

        const invocationArgs = apiClient.updateList.mock.calls[0];
        const callback = invocationArgs[3];

        callback(updatedList);
        storeActions = store.getActions();
      });

      it("dispatches updateListRequest", () => {
        expect(storeActions[0]).toEqual(actions.updateListRequest());
      });

      it("dispatches updateListSuccess", () => {
        expect(storeActions[1]).toEqual(
          actions.updateListSuccess(1, 1, updatedList)
        );
      });
    });
  });
});
