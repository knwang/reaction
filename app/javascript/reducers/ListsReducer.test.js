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
    describe("lists for the same board already exist", () => {
      const list1 = { id: 1, title: "First list", board_id: 1 };
      const list2 = { id: 2, title: "Second list", board_id: 1 };
      const otherList = { id: 3, title: "Second list", board_id: 2 }

      it("returns the state object with them replaced", () => {
        expect(
          reducer([list1, otherList], {
            type: types.FETCH_LISTS_SUCCESS,
            boardId: 1,
            lists: [list2]
          })
        ).toEqual([otherList, list2]);
      });

      it("returns the state object with action.lists concatenated", () => {
        expect(
          reducer([], {
            type: types.FETCH_LISTS_SUCCESS,
            boardId: 1,
            lists: [list1]
          })
        ).toEqual([list1]);
      });

      it("casts the list ids to numbers", () => {
        expect(
          reducer([], {
            type: types.FETCH_LISTS_SUCCESS,
            boardId: 1,
            lists: [{ id: "1", board_id: 1 }, { id: "2", board_id: 2 }]
          })
        ).toEqual([{ id: 1, board_id: 1 }, { id: 2, board_id: 2 }]);
      });

      it("casts the list board_ids to numbers", () => {
        expect(
          reducer([], {
            type: types.FETCH_LISTS_SUCCESS,
            boardId: 1,
            lists: [{ id: 1, board_id: "1" }, { id: 2, board_id: 2 }]
          })
        ).toEqual([{ id: 1, board_id: 1 }, { id: 2, board_id: 2 }]);
      })
    });
  });

  describe("CREATE_LIST_SUCCESS", () => {
    it("returns the current state with the `list` action value concatenated", () => {
      const list1 = { id: 1, title: "Old list", board_id: 1 };
      const list2 = { id: 2, title: "New list", board_id: 1 };

      expect(
        reducer([list1], {
          type: types.CREATE_LIST_SUCCESS,
          boardId: 1,
          list: list2,
        })
      ).toEqual([list1, list2]);
    });

    it("casts the new list id to a number", () => {
      const newList = { id: "22", title: "New list", board_id: 1 };

      const state = reducer([], {
        type: types.CREATE_LIST_SUCCESS,
        boardId: 1,
        list: newList,
      });

      expect(
        state[0].id
      ).toEqual(22);
    });

    it("casts the new list board_id to a number", () => {
      const newList = { id: 22, title: "New list", board_id: "1" };

      const state = reducer([], {
        type: types.CREATE_LIST_SUCCESS,
        boardId: 1,
        list: newList,
      });

      expect(
        state[0].board_id
      ).toEqual(1);
    });
  });
});
