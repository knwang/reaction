import reducer from './ListsReducer';
import * as types from '../constants/ActionTypes';

describe("ListsReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    });
  });

  describe("FETCH_LISTS_SUCCESS", () => {
    it("returns the state value with action.lists added", () => {
      expect(
        reducer({}, {
          type: types.FETCH_LISTS_SUCCESS,
          boardId: 1,
          lists: [
            { id: 1, title: "My list" },
            { id: 2, title: "My other list" }
          ]
        })
      ).toEqual({"1": [
        { id: 1, title: "My list" },
        { id: 2, title: "My other list" }
      ]});
    });
  });

  describe("CREATE_LIST_SUCCESS", () => {
    it("returns the current state with the `list` action value concatenated", () => {
      const list1 = { id: 1, title: "Old list", };
      const list2 = { id: 2, title: "New list", };

      expect(
        reducer({ "1": [list1], "2": [] }, {
          type: types.CREATE_LIST_SUCCESS,
          boardId: 1,
          list: list2,
        })
      ).toEqual({ "1": [list1, list2], "2": [] });
    });

    it("casts the new list id to a number", () => {
      const newList = { id: "22", title: "New list", };

      const state = reducer({}, {
        type: types.CREATE_LIST_SUCCESS,
        boardId: 1,
        list: newList,
      });

      expect(
        state["1"][0].id
      ).toEqual(22);
    });
  });
});
