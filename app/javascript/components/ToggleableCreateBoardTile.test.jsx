import ToggleableCreateBoardTile from './ToggleableCreateBoardTile';
import React from 'react';
import { mount } from 'enzyme';

describe("ToggleableCreateBoardTile", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ToggleableCreateBoardTile />)
  });

  it("has a false `showForm` state property", () => {
    expect(
      wrapper.state().showForm
    ).toBe(false);
  });

  it("shows the tile", () => {
    expect(
      wrapper.find(".board-tile .new-board").length
    ).toEqual(1);
  });

  it("doesn't show the form", () => {
    expect(
      wrapper.find(".new-board-form").length
    ).toEqual(0);
  });

  describe("user clicks on the tile", () => {
    beforeEach(() => {
      const tileLink = wrapper.find('.new-board').first();
      tileLink.simulate('click');
    });

    it("sets the `showForm` state property", () => {
      expect(
        wrapper.state().showForm
      ).toBe(true);
    });
    
    it("doesn't show the tile", () => {
      expect(
        wrapper.find(".board-tile .new-board").length
      ).toEqual(0);
    });

    it("shows the form", () => {
      expect(
        wrapper.find(".new-board-form").length
      ).toEqual(1);
    });

    describe("and then closes the form", () => {
      beforeEach(() => {
        const closeLink = wrapper.find('.new-board-form header .icon-close').first();
        closeLink.simulate('click');
      });

      it("sets the `showForm` state property", () => {
        expect(
          wrapper.state().showForm
        ).toBe(false);
      });
    });
  });
});
