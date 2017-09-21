import React from 'react';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import * as actions from './BoardActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("Board actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.getBoard.mockClear();
    apiClient.createBoard.mockClear();
    store.clearActions()
  });

  describe("fetchBoardsRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchBoardsRequest()
      ).toEqual({ type: types.FETCH_BOARDS_REQUEST });
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

  describe("fetchBoardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.fetchBoardRequest()
      ).toEqual({ type: types.FETCH_BOARD_REQUEST });
    });
  });

  describe("fetchBoardSuccess", () => {
    const board = { id: 1, title: "My board" };

    it("returns the correct object", () => {
      expect(
        actions.fetchBoardSuccess(board)
      ).toEqual({ type: types.FETCH_BOARD_SUCCESS, board });
    });
  });

  describe("action creators", () => {
    let storeActions;

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
        storeActions = store.getActions();
      });

      it("dispatches fetchBoardsRequest()", () => {
        expect(storeActions[0]).toEqual(actions.fetchBoardsRequest());
      });

      it("dispatches fetchBoardsSuccess()", () => {
        expect(storeActions[1]).toEqual(actions.fetchBoardsSuccess(boards));
      })
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
        storeActions = store.getActions();
      });

      it("dispatches createBoardRequest()", () => {
        expect(storeActions[0]).toEqual(actions.createBoardRequest());
      });

      it("dispatches createBoardSuccess()", () => {
        expect(storeActions[1]).toEqual(
          actions.createBoardSuccess(newBoardResponse)
        );
      });
    });

    describe("fetchBoard", () => {
      const board = { id: 1, title: "My board" };

      beforeEach(() => {
        store.dispatch(actions.fetchBoard(1));

        const invocationArgs = apiClient.getBoard.mock.calls[0];
        const callback = invocationArgs[1];

        callback(board);
        storeActions = store.getActions();
      });

      it("dispatches fetchBoardRequest()", () => {
        expect(storeActions[0]).toEqual(actions.fetchBoardRequest());
      });

      it("dispatches fetchBoardSuccess()", () => {
        expect(storeActions[1]).toEqual(actions.fetchBoardSuccess(board));
      })
    });
  });
});
