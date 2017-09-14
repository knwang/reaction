import reducer from './NewListFormReducer';
import * as types from '../constants/ActionTypes';

describe("NewListFormReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    })
  });

  describe("SHOW_CREATE_LIST_FORM", () => {
    const state = { some: "value", display: false };

    it("returns an object with `display` set to true", () => {
      expect(
        reducer(state, { type: types.SHOW_CREATE_LIST_FORM }).display
      ).toEqual(true);
    });

    it("returns the rest of the state", () => {
      expect(
        reducer(state, { type: types.SHOW_CREATE_LIST_FORM }).some
      ).toEqual("value");
    });
  });

  describe("HIDE_CREATE_LIST_FORM", () => {
    const state = { some: "value", display: true };

    it("returns an object with `display` set to false", () => {
      expect(
        reducer(state, { type: types.HIDE_CREATE_LIST_FORM }).display
      ).toEqual(false);
    });

    it("returns the rest of the state", () => {
      expect(
        reducer(state, { type: types.HIDE_CREATE_LIST_FORM }).some
      ).toEqual("value");
    });
  });

  describe("UPDATE_CREATE_LIST_FORM_INPUT_TEXT", () => {
    const state = { some: "value", display: true };
    const title = "New title";

    it("returns an object with `title` set to action.text", () => {
      expect(
        reducer(state, {
          type: types.UPDATE_CREATE_LIST_FORM_INPUT_TEXT, text: title
        }).title
      ).toEqual(title);
    });

    it("returns the rest of the state", () => {
      expect(
        reducer(state, {
          type: types.UPDATE_CREATE_LIST_FORM_INPUT_TEXT, text: title
        }).some
      ).toEqual("value");
    });
  });

  describe("CREATE_LIST_REQUEST", () => {
    const state = { some: "value", display: true };

    it("returns an object with `isSaving` set to true", () => {
      expect(
        reducer(state, { type: types.CREATE_LIST_REQUEST }).isSaving
      ).toEqual(true);
    });

    it("returns the rest of the state", () => {
      expect(
        reducer(state, { type: types.CREATE_LIST_REQUEST }).some
      ).toEqual("value");
    });
  });

  describe("CREATE_LIST_SUCCESS", () => {
    const state = { some: "value", display: true };

    it("returns the state with `display` set to false", () => {
      expect(
        reducer(state, { type: types.CREATE_LIST_SUCCESS }).display
      ).toEqual(false);
    });

    it("returns the state with `isSaving` set to false", () => {
      expect(
        reducer(state, { type: types.CREATE_LIST_SUCCESS }).isSaving
      ).toEqual(false);
    });

    it("returns the rest of the state", () => {
      expect(
        reducer(state, { type: types.CREATE_LIST_SUCCESS }).some
      ).toEqual("value");
    });
  });
});
