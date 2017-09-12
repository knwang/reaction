import React from 'react';
import { shallow } from 'enzyme';

import ListCard from './ListCard';

describe("ListCard", () => {
  let wrapper;
  const card = {
    id: 1,
    title: "My card",
    labels: ["red", "green", "blue", "striped"]
  };

  it("displays the card title", () => {
    wrapper = shallow(<ListCard card={card} />);

    expect(
      wrapper.html().match(card.title)
    ).not.toBeNull();
  });

  it("displays the card labels", () => {
    wrapper = shallow(<ListCard card={card} />);

    card.labels.forEach(label => {
      expect(
        wrapper.find(`.card-label.${label}`).length
      ).toEqual(1);
    });
  });
});
