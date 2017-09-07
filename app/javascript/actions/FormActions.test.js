import React from 'react';

import * as actions from './FormActions';
import * as types from '../constants/ActionTypes';

describe("Form actions", () => {
  describe("showCreateBoardForm", () => {
    it("returns the correct object", () => {
      expect(
        actions.showCreateBoardForm()
      ).toEqual({ type: types.SHOW_CREATE_BOARD_FORM});
    });
  });

  describe("hideCreateBoardForm", () => {
    it("returns the correct object", () => {
      expect(
        actions.hideCreateBoardForm()
      ).toEqual({ type: types.HIDE_CREATE_BOARD_FORM});
    });
  });

  describe("updateCreateBoardFormInputText", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateCreateBoardFormInputText("new text")
      ).toEqual({
        type: types.UPDATE_CREATE_BOARD_FORM_INPUT_TEXT,
        text: "new text"
      });
    });
  });
});
