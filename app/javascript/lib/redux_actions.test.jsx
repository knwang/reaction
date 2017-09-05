import React from 'react';
import store from './store';

import apiClient from './api_client.js';
jest.mock('./api_client');

import { dispatch } from 'redux';

import { fetchBoards, createBoard, clearStoreData } from './redux_actions'; 

describe("Redux actions", () => {
  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createBoard.mockClear();
    store.dispatch(clearStoreData());
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

  describe("createBoard", () => {
    const newBoard = {
      title: "Awesome board"
    };

    const newBoardResponse = {
      id: "1",
      title: "Awesome board"
    };

    beforeEach(() => {
      store.dispatch(createBoard(newBoard));

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
