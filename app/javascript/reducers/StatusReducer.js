export default function statusReducer(state, action) {
  if (action.type === 'FETCH_BOARDS_REQUEST') {
    return 'FETCHING_BOARDS';
  } else {
    return state;
  }
};
