import positionCalculator from './PositionCalculator';

describe("PositionCalculator", () => {
  describe("moving an item", () => {
    describe("item is moved to the beginning of the list", () => {
      const list = [
        { position: 12 }
      ];

      it("returns half of the first item's position", () => {
        expect(positionCalculator(list, 1)).toEqual(6);
      });
    });

    describe("item is moved to the end of the list", () => {
      const list = [
        { position: 12 }
      ];

      it("returns the last item's position plus 65536", () => {
        expect(positionCalculator(list, 2)).toEqual(12 + 65536);
      });
    });

    describe("item is moved in between two others", () => {
      it("returns the median of their positions", () => {
        const list = [
          { position: 12 },
          { position: 24 },
          { position: 36 }
        ];

        expect(positionCalculator(list, 2)).toEqual(18);
      });

      it("can return a number less than one", () => {
        const list = [
          { position: 0 },
          { position: 1 },
          { position: 2 }
        ];

        expect(positionCalculator(list, 2)).toEqual(0.5);
      });
    });
  });

  describe("creating a new item", () => {
    describe("item is the only one in the list", () => {
      const list = [];

      it("returns 65535", () => {
        expect(positionCalculator(list, 1)).toEqual(65535);
      });
    });

    describe("item is not the only one in the list", () => {
      const list = [
        { position: 12 }
      ];

      it("returns the last item's position plus 65536", () => {
        expect(positionCalculator(list, 2)).toEqual(12 + 65536);
      });
    });
  });
});
