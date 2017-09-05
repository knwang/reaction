import BoardsDashboardDisplay from './BoardsDashboardDisplay';
import React from 'react';
import { mount } from 'enzyme';
import store from '../lib/store';

const boardsWrapper = function(boards) {
  return mount(<BoardsDashboardDisplay boards={boards} />, { context: { store }});
}

describe("BoardsDashboardDisplay", () => {
  it("renders one tile", () => {
    const boards = [{
      id: 1,
      title: "Web Development"
    }];

    const wrapper = boardsWrapper(boards);

    expect(
      wrapper.html().match('Web Development').length
    ).toEqual(1);
  });

  it("renders more than one tile", () => {
    const boards = [{
      id: 1,
      title: "Web Development"
    }, {
      id: 2,
      title: "Recipes"
    }];

    const wrapper = boardsWrapper(boards);

    expect(
      wrapper.html().match('Web Development').length
    ).toEqual(1);

    expect(
      wrapper.html().match('Recipes').length
    ).toEqual(1);
  });

  it("renders a 'create a board' tile", () => {
    const boards = [];

    const wrapper = boardsWrapper(boards);

    expect(
      wrapper.html().match(
        '<span class="board-title">Create a new board...</span>'
      ).length
    ).toEqual(1);
  });
});
