import React from 'react';
import { shallow } from 'enzyme';

import ListListing from './ListListing';
import List from './List';
import CreateListTileContainer from './CreateListTileContainer';

describe("ListListing", () => {
  let wrapper;

  it("displays no lists", () => {
    wrapper = shallow(<ListListing lists={[]} />);

    expect(
      wrapper.containsMatchingElement(<List />)
    ).toEqual(false);
  });

  it("displays one list", () => {
    const lists = [{ id: 1, title: "My list" }];
    wrapper = shallow(<ListListing lists={lists} />);

    expect(
      wrapper.containsMatchingElement(<List list={lists[0]} />)
    ).toEqual(true);
  });

  it("it displays more than one list", () => {
    const lists = [{ id: 1, title: "My list" },
                   { id: 2, title: "My other list" }];

    wrapper = shallow(<ListListing lists={lists} />);

    expect(
      wrapper.containsAllMatchingElements([
        <List list={lists[0]} />,
        <List list={lists[1]} />
      ])
    ).toEqual(true);
  });

  it("displays a new list button", () => {
    wrapper = shallow(<ListListing lists={[]} />);

    expect(
      wrapper.containsMatchingElement(<CreateListTileContainer />)
    ).toEqual(true);
  })
});
