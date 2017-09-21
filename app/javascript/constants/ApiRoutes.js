export const BOARDS_INDEX_URL = '/api/boards';
export const CREATE_BOARD_URL = '/api/boards';

export const boardUrl = (boardId) => `${BOARDS_INDEX_URL}/${boardId}`;

export const CREATE_LIST_URL = '/api/lists';

export const updateListUrl = (listId) => `/api/lists/${listId}`;
