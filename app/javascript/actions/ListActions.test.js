import React from 'react';
import { createStore } from '../lib/Store';

import apiClient from '../lib/ApiClient';
jest.mock('../lib/ApiClient');

import * as actions from './ListActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("List actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  afterEach(() => {
    apiClient.getLists.mockClear();
    apiClient.createList.mockClear();
  });

  describe("fetchListsRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchListsRequest()
      ).toEqual({ type: types.FETCH_LISTS_REQUEST });
    });

    it("sets the `status` store property", () => {
      expect(
        store.getState().status
      ).not.toEqual(statuses.FETCHING_LISTS);

      store.dispatch(actions.fetchLists(1));

      expect(
        store.getState().status
      ).toEqual(statuses.FETCHING_LISTS);
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

  describe("action creators", () => {
    beforeEach(() => {
      store = createStore({ lists: { "1": [], "2": [] }});
    });

    describe("fetchLists", () => {
      const lists = [{ id: "1", title: "My list" }];

      beforeEach(() => {
        store.dispatch(actions.fetchLists(1));

        const invocationArgs = apiClient.getLists.mock.calls[0];
        const callback = invocationArgs[1];

        callback(lists);
      });

      it("updates the state `lists` property", () => {
        expect(
          store.getState().lists
        ).toEqual({
          "1" : [{ id: 1, title: "My list" }],
          "2": []
        });
      });

      it("sets the `status` property", () => {
        expect(
          store.getState().status
        ).toEqual(statuses.LISTS_FETCHED_SUCCESSFULLY)
      });
    });

    describe("createList", () => {
      beforeEach(() => {
        store.dispatch(actions.createList(1, { title: "My list" }));

        const invocationArgs = apiClient.createList.mock.calls[0];
        const callback = invocationArgs[2];

        callback({ id: 1, title: "My list" });
      });

      it("adds the new list to the store", () => {
        expect(
          store.getState().lists
        ).toEqual({
          "1" : [{ id: 1, title: "My list" }],
          "2": []
        });
      });
    });
  });
});
