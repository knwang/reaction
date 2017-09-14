import React from 'react';
import { shallow } from 'enzyme';

import Board from './Board';
import BoardHeader from './BoardHeader';
import ListListing from './ListListing';

describe("Board", () => {
  const board = {
    id: 1,
    title: "My board",
    lists: []
  };

  const lists = [{
    id: 1,
    title: "My list",
    board_id: 1
  }];
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Board board={board} lists={lists} />);
  })

  it("displays the board header", () => {
    expect(
      wrapper.containsMatchingElement(<BoardHeader />)
    ).toBe(true);
  });

  it("displays the lists section", () => {
    expect(
      wrapper.containsMatchingElement(<ListListing lists={lists} />)
    ).toBe(true);
  });
});
