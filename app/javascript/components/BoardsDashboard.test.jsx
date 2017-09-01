import BoardsDashboard from './BoardsDashboard';
import React from 'react';
import { shallow } from 'enzyme';

const store = {
  getState: jest.fn()
};

describe("BoardsDashboard", () => {
  afterEach(() => {
    store.getState.mockClear();
  });

  it("renders one tile", () => {
    store.getState.mockReturnValue({
      boards: [{
        id: 1,
        title: "Web Development"
      }]
    });

    const wrapper = shallow(<BoardsDashboard />, { context: { store }});

    expect(
      wrapper.html().match('Web Development').length
    ).toEqual(1);
  });

  it("renders more than one tile", () => {
    store.getState.mockReturnValue({
      boards: [{
        id: 1,
        title: "Web Development"
      }, {
        id: 2,
        title: "Recipes"
      }]
    });

    const wrapper = shallow(<BoardsDashboard />, { context: { store }});

    expect(
      wrapper.html().match('Web Development').length
    ).toEqual(1);

    expect(
      wrapper.html().match('Recipes').length
    ).toEqual(1);
  });

  it("renders a 'create a board' tile", () => {
    store.getState.mockReturnValue({
      boards: []
    });

    const wrapper = shallow(<BoardsDashboard />, { context: { store }})

    expect(
      wrapper.html().match(
        '<span class="board-title">Create a new board...</span>'
      ).length
    ).toEqual(1);
  });
});
