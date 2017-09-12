export default function boardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARDS_SUCCESS') {
    return action.boards.map(board => ({ lists: [], ...board }));
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    const newBoard = action.board;
    newBoard.id = Number(newBoard.id);

    return state.concat(newBoard);
  } else {
    return state;
  }
}
