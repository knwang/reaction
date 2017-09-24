import reducer from './CardsReducer';

import * as types from '../constants/ActionTypes';

describe("CardsReducer", () => {
  it("handles unknown types", () => {
    expect(
      reducer('initial state', { type: 'FAKE_TYPE' })
    ).toEqual('initial state');
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    const existingCard = { id: 1, board_id: 1, title: "old card" };
    const replacementCard = { id: 1, board_id: 1, title: "replacement card" };
    const newCard1 = { id: 2, board_id: 1, list_id: 1, title: "new card" };
    const newCard2 = { id: 3, board_id: 1, list_id: 2, title: "new card" };
    const otherCard = { id: 4, board_id: 2, title: "other card" };

    it("adds new cards to the state", () => {
      expect(
        reducer([existingCard], {
          type: types.FETCH_BOARD_SUCCESS,
          board: {
            id: 1,
            lists: [{
              id: 1,
              cards: [newCard1]
            }, {
              id: 2,
              cards: [newCard2]
            }]
          }
        })
      ).toEqual([existingCard, newCard1, newCard2])
    });

    it("replaces existing cards from the board", () => {
      expect(
        reducer([existingCard], {
          type: types.FETCH_BOARD_SUCCESS,
          board: {
            id: 1,
            lists: [{
              id: 1,
              cards: [replacementCard]
            }]
          }
        })
      ).toEqual([replacementCard]);
    });

    it("doesn't change other board cards", () => {
      expect(
        reducer([otherCard], {
          type: types.FETCH_BOARD_SUCCESS,
          board: {
            id: 1,
            lists: [{
              id: 1,
              cards: [newCard1]
            }]
          }
        })
      ).toEqual([otherCard, newCard1]);
    });
  });
});
