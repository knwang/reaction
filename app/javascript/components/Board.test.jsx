import React from 'react';
import { shallow } from 'enzyme';

import Board from './Board';
import BoardHeader from './BoardHeader';
import ListListing from './ListListing';

describe("Board", () => {
  let wrapper;

  beforeEach(() => {
    const board = {
      id: 1,
      title: "My board",
      lists: []
    };

    wrapper = shallow(<Board board={board} />);
  })

  it("displays the board header", () => {
    expect(
      wrapper.containsMatchingElement(<BoardHeader />)
    ).toBe(true);
  });

  it("displays the lists section", () => {
    expect(
      wrapper.containsMatchingElement(<ListListing />)
    ).toBe(true);
  });
});
