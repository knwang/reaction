import reducer from './StatusReducer';
import * as statuses from '../constants/statuses';
import * as actions from '../constants/ActionTypes';
import * as constants from '../actions/BoardActions';

describe("StatusReducer", () => {
  describe("unhandled action type", () => {
    it("returns the given state", () => {
      expect(
        reducer("fake state", { type: "FAKE_TYPE" })
      ).toEqual("fake state");
    });
  });

  describe(actions.FETCH_BOARDS_REQUEST, () => {
    it("returns the correct status", () => {
      expect(
        reducer(undefined, { type: actions.FETCH_BOARDS_REQUEST })
      ).toEqual(statuses.FETCHING_BOARDS);
    });
  });
});
