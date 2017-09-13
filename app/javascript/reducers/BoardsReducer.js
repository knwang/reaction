import listsReducer from './ListsReducer';

export default function boardsReducer(state = [], action) {
  if (action.type === 'FETCH_BOARDS_SUCCESS') {
    return action.boards.map(board => ({
     ...board,
     lists: listsReducer(board.lists, action),
    }));
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    const newBoard = action.board;
    newBoard.id = Number(newBoard.id);

    return state.concat(newBoard);
  } else {
    return state;
  }
}
