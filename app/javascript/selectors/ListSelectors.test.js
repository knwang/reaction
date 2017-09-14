import * as selectors from './ListSelectors';

describe("List selectors", () => {
  describe("boardListsSelector", () => {
    it("retrieves the lists for the given board id", () => {
      const list1 = { id: 1, title: "A list", board_id: 1 };
      const list2 = { id: 2, title: "Another list", board_id: 2 };
      const list3 = { id: 3, title: "Yet another list", board_id: 1 };
      const state = { lists: [list1, list2, list3]};

      expect(
        selectors.boardListsSelector(state, 1)
      ).toEqual([list1, list3]);
    });
  });
});
