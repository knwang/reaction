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
    it("returns the action.lists value", () => {
      expect(
        reducer([], {
          type: types.FETCH_LISTS_SUCCESS,
          lists: [
            { id: 1, title: "My list" },
            { id: 2, title: "My other list" }
          ]
        })
      ).toEqual([
        { id: 1, title: "My list" },
        { id: 2, title: "My other list" }
      ]);
    });
  });

  describe("CREATE_LIST_SUCCESS", () => {
    it("returns the current state with the `list` action value concatenated", () => {
      const list1 = { id: 1, title: "Old list", };
      const list2 = { id: 2, title: "New list", };

      expect(
        reducer([list1], {
          type: types.CREATE_LIST_SUCCESS,
          list: list2,
        })
      ).toEqual([list1, list2]);
    });

    it("casts the new list id to a number", () => {
      const newList = { id: "22", title: "New list", };

      const state = reducer([], {
        type: types.CREATE_LIST_SUCCESS,
        list: newList,
      });

      expect(
        state[0].id
      ).toEqual(22);
    });
  });
});
