import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import BoardContainer from './BoardContainer';
import Board from './Board';
import { createStore } from '../lib/Store';

describe("BoardContainer", () => {
  describe("valid board id", () => {
    let wrapper;
    let store;
    const boards = [{
      id: 1,
      title: "My board",
      lists: []
    }];

    beforeEach(() => {
      store = createStore({ boards });

      wrapper = shallow(
        <BoardContainer match={{ params: { boardId: 1 }}} />, 
        { context: { store } }
      );
    });

    it("renders a Board", () => {
      expect(
        wrapper.containsMatchingElement(
          <Board />
        )
      ).toEqual(true);
    });

    it("passes the correct prop", () => {
      expect(
        wrapper.props().board
      ).toEqual(boards[0]);
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
