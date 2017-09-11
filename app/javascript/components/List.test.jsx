import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import CardListing from './CardListing';

describe("List", () => {
  let wrapper;
  const list = {
    id: 1,
    title: "My list",
    cards: []
  };

  it("displays the list title", () => {
    wrapper = shallow(<List list={list} />);

    expect(
      wrapper.html().match(/My list/)
    ).not.toBeNull();
  });

  it("displays a CardListing", () => {
    wrapper = shallow(<List list={list} />);

    expect(
      wrapper.containsMatchingElement(
        <CardListing cards={list.cards} />
      )
    ).toEqual(true);
  });
});
