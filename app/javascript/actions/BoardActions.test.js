import React from 'react';
import { createStore } from '../lib/Store';

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import * as actions from './BoardActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("Board actions", () => {
  let store;

  beforeEach(() => {
    store = createStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createBoard.mockClear();
  });

  describe("fetchBoardsRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchBoardsRequest()
      ).toEqual({ type: types.FETCH_BOARDS_REQUEST });
    });

    it("sets the `status` store property", () => {
      expect(
        store.getState().status
      ).not.toEqual(statuses.FETCHING_BOARDS);

      store.dispatch(actions.fetchBoardsRequest());

      expect(
        store.getState().status
      ).toEqual(statuses.FETCHING_BOARDS);
    });
  });

  describe("fetchBoardsSuccess", () => {
    it("returns the correct object", () => {
      const boards = [{ id: 1, title: "my board" }];

      expect(
        actions.fetchBoardsSuccess(boards)
      ).toEqual({ type: types.FETCH_BOARDS_SUCCESS, boards });
    });
  });

  describe("createBoardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createBoardRequest()
      ).toEqual({ type: types.CREATE_BOARD_REQUEST });
    });
  });

  describe("createBoardSuccess", () => {
    it("returns the correct object", () => {
      const board = { id: 1, title: "my board" };

      expect(
        actions.createBoardSuccess(board)
      ).toEqual({ type: types.CREATE_BOARD_SUCCESS, board });
    });
  });

  describe("action creators", () => {
    describe("fetchBoards", () => {
      const boards = [{
        id: 1,
        title: 'Mechanics Tricks'
      }];

      beforeEach(() => {
        store.dispatch(actions.fetchBoards());

        const invocationArgs = apiClient.getBoards.mock.calls[0];
        const callback = invocationArgs[0];

        callback(boards);
      });

      it("updates state property `boards`", () => {
        expect(
          store.getState().boards
        ).toEqual(boards);
      });

      it("sets the `status` store property", () => {
        expect(
          store.getState().status
        ).toEqual(statuses.BOARDS_FETCHED_SUCCESSFULLY);
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
        store.dispatch(actions.createBoard(newBoard));

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
});
