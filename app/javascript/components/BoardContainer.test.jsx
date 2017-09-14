import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';

import BoardContainer from './BoardContainer';
import Board from './Board';
import { createStore } from '../lib/Store';

import apiClient from '../lib/ApiClient';
jest.mock('../lib/ApiClient');

describe("BoardContainer", () => {
  describe("valid board id", () => {
    const boards = [{ id: 1, title: "My board" }];
    const lists = [{ id: 1, title: "My list", board_id: 1 }];
    let wrapper;
    let store;

    beforeEach(() => {
      store = createStore({ boards, lists });

      wrapper = shallow(
        <BoardContainer match={{ params: { boardId: 1 }}} />, 
        { context: { store }, lifecycleExperimental: true }
      );
    });

    it("renders a Board", () => {
      expect(
        wrapper.containsMatchingElement(
          <Board />
        )
      ).toEqual(true);
    });

    it("passes the correct board prop", () => {
      expect(
        wrapper.props().board
      ).toEqual(boards[0]);
    });

    it("passes the correct lists prop", () => {
      expect(
        wrapper.props().lists
      ).toEqual(lists);
    });
  });

  describe("invalid board id", () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = createStore({ boards: [] });

      wrapper = shallow(
        <BoardContainer match={{ params: { boardId: 1 }}} />, 
        { context: { store } }
      );
    });

    it("renders a Redirect to '/'", () => {
      expect(
        wrapper.containsMatchingElement(
          <Redirect to="/" />
        )
      ).toEqual(true);
    });
  });
});
