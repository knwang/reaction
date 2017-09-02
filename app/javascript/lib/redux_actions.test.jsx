import React from 'react';
import store from './store';
import jest from 'jest';

import { dispatch } from 'redux';

import { fetchBoards } from './redux_actions'; 

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);

describe("Redux actions", () => {
  afterEach(() => {
    axiosMock.restore();
  });

  describe("fetchBoards", () => {
    it("updates state property `boards`", () => {
      const boards = [{
        id: 1,
        title: 'Mechanics Tricks'
      }];

      axiosMock.onAny().reply(200, boards);

      store.dispatch(fetchBoards())
        .then(() => {
          expect(
            store.getState().boards
          ).toEqual(boards);
        });
    });
  });
});
