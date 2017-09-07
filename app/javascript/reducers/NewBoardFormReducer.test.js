import reducer from './NewBoardFormReducer';
import * as types from '../constants/ActionTypes';

describe("NewBoardFormReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    });
  });

  describe("SHOW_CREATE_BOARD_FORM", () => {
    it("returns an object with `display` set to true", () => {
      const state = { some: "value", display: false };

      expect(
        reducer(state, { type: types.SHOW_CREATE_BOARD_FORM }).display
      ).toEqual(true)
    });

    it("returns the rest of the state", () => {
      const state = { some: "value", display: false };

      expect(
        reducer(state, { type: types.SHOW_CREATE_BOARD_FORM }).some
      ).toEqual("value")
    });
  });

  describe("HIDE_CREATE_BOARD_FORM", () => {
    it("returns an object with `display` set to false", () => {
      const state = { some: "value", display: true, };

      expect(
        reducer(state, { type: types.HIDE_CREATE_BOARD_FORM }).display
      ).toEqual(false)
    });

    it("returns the rest of the state", () => {
      const state = { some: "value", display: true };

      expect(
        reducer(state, { type: types.HIDE_CREATE_BOARD_FORM }).some
      ).toEqual("value")
    });
  });

  describe("UPDATE_CREATE_BOARD_FORM_INPUT_TEXT", () => {
    it("returns an object with the `title` property set to action.text", () => {
      const newTitle = "New Title";
      const state = { display: true, text: "" };

      expect(
        reducer(state, {
          type: types.UPDATE_CREATE_BOARD_FORM_INPUT_TEXT,
          text: newTitle
        }).title
      ).toEqual(newTitle);
    });

    it("returns the rest of the state", () => {
      const newTitle = "New Title";
      const state = { some: "value", text: "" };

      expect(
        reducer(state, {
          type: types.UPDATE_CREATE_BOARD_FORM_INPUT_TEXT,
          text: newTitle
        }).some
      ).toEqual("value");
    });
  });

  describe("CREATE_BOARD_SUCCESS", () => {
    it("sets the state `title` property to an empty string", () => {
      const state = { some: "value", title: "Board Title" };

      expect(
        reducer(state, { type: types.CREATE_BOARD_SUCCESS }).title
      ).toEqual("");
    });

    it("sets the state `display` property to false", () => {
      const state = { display: true };

      expect(
        reducer(state, { type: types.CREATE_BOARD_SUCCESS }).display
      ).toEqual(false);
    });

    it("returns the rest of the state", () => {
      const state = { some: "value", display: true };

      expect(
        reducer(state, { type: types.CREATE_BOARD_SUCCESS }).some
      ).toEqual("value");
    });
  });
});
