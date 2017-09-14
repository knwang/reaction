import React from 'react';
import { mount } from 'enzyme';
import { createStore } from '../lib/Store';

import CreateListTile from './CreateListTile';
import CreateListTileContainer from './CreateListTileContainer';

describe("CreateListTileContainer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CreateListTileContainer />,
      { 
        context: {
          store: createStore(),
          currentBoardId: 1,
        }
      });
  });

  it("doesn't show the form", () => {
    const tile = wrapper.find('.new-list').first();

    expect(
      tile.hasClass('selected')
    ).toEqual(false);
  });

  describe("user clicks on the tile", () => {
    beforeEach(() => {
      const tile = wrapper.find('.new-list').first();
      tile.simulate('click');
    });

    it("shows the form", () => {
      expect(
        wrapper.find('.new-list').first().hasClass('selected')
      ).toEqual(true);
    });

    describe("then types a title", () => {
      beforeEach(() => {
        const input = wrapper.find('input[type="text"]').first();
        input.simulate('change', {
          target: { value: "new title" }
        });
      });

      it("updates the title prop", () => {
        expect(
          wrapper.containsMatchingElement(
            <CreateListTile title={"new title"} />
          )
        ).toEqual(true)
      });
      
      describe("then clicks the save button", () => {
        beforeEach(() => {
          const button = wrapper.find('input[type="submit"]');
          button.simulate('click', {
            preventDefault: () => {}
          });
        });
      });
    });
  });
});
