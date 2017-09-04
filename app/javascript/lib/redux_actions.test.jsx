import React from 'react';
import store from './store';

import apiClient from './api_client.js';
jest.mock('./api_client');

import { dispatch } from 'redux';

import { fetchBoards } from './redux_actions'; 

describe("Redux actions", () => {
  afterEach(() => {
    apiClient.getBoards.mockClear();
  });

  describe("fetchBoards", () => {
    it("updates state property `boards`", () => {
      const boards = [{
        id: 1,
        title: 'Mechanics Tricks'
      }];

      store.dispatch(fetchBoards());

      const invocationArgs = apiClient.getBoards.mock.calls[0];
      const callback = invocationArgs[0];

      callback(boards);

      expect(
        store.getState().boards
      ).toEqual(boards);
    });
  });
});
