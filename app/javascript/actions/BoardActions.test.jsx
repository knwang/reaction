import React from 'react';
import { createStore } from '../lib/Store';

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import { dispatch } from 'redux';

import * as boardActions from './BoardActions';

describe("Redux actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createBoard.mockClear();
  });

  describe("fetchBoards", () => {
    it("updates state property `boards`", () => {
      const boards = [{
        id: 1,
        title: 'Mechanics Tricks'
      }];

      store.dispatch(boardActions.fetchBoards());

      const invocationArgs = apiClient.getBoards.mock.calls[0];
      const callback = invocationArgs[0];

      callback(boards);

      expect(
        store.getState().boards
      ).toEqual(boards);
    });
  });

  describe("createBoard", () => {
    const newBoard = {
      title: "Awesome board"
    };

    const newBoardResponse = {
      id: "1",
      title: "Awesome board"
    };

    beforeEach(() => {
      store.dispatch(boardActions.createBoard(newBoard));

      const invocation = apiClient.createBoard.mock.calls[0];
      const callback = invocation[1];

      callback(newBoardResponse);
    });

    it("adds the new board to the store", () => {
      expect(
        store.getState().boards[0].title
      ).toEqual("Awesome board");
    });

    it("converts the id to a number", () => {
      expect(
        typeof store.getState().boards[0].id
      ).toEqual("number");
    });
  });
});
