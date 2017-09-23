import * as selectors from './CardSelectors';

describe("CardSelectors", () => {
  describe("getCardById", () => {
    const state = { cards: [
      { id: 1, title: "My card" },
      { id: 2, title: "My card" },
      { id: 3, title: "My card" }
    ]};

    describe("valid id", () => {
      it("returns the card with the correct id", () => {
        expect(
          selectors.getCardById(state, 2)
        ).toEqual(state.cards[1]);
      });
    });

    describe("invalid id", () => {
      it("returns undefined", () => {
        expect(
          selectors.getCardById(state, 2)
        ).toEqual(state.cards[1]);
      });
    });
  });
});
