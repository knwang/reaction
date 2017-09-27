import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import ListCard from './ListCard';

describe("ListCard", () => {
  let wrapper;
  const card = {
    id: 1,
    title: "My card",
    labels: ["red", "green", "blue", "striped"]
  };

  beforeEach(() => {
    wrapper = mount(<Router><ListCard card={card} /></Router>);
  });

  it("displays the card title", () => {
    expect(
      wrapper.html().match(card.title)
    ).not.toBeNull();
  });

  it("displays the card labels", () => {
    card.labels.forEach(label => {
      expect(
        wrapper.find(`.card-label.${label}`).length
      ).toEqual(1);
    });
  });
});
