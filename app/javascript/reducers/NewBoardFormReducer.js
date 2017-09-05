const defaultNewBoardFormState = {
  display: false,
  title: ''
};

export default function newBoardFormReducer(state = defaultNewBoardFormState, action) {
  if (action.type === 'SHOW_CREATE_BOARD_FORM') {
    return {
      ...state,
      display: true
    };
  } else if (action.type === 'HIDE_CREATE_BOARD_FORM') {
    return {
      ...state,
      display: false
    };
  } else if (action.type === 'UPDATE_CREATE_BOARD_FORM_INPUT_TEXT') {
    return {
      ...state,
      title: action.text
    };
  } else if (action.type === 'CREATE_BOARD_SUCCESS') {
    return {
      ...state,
      title: '',
      display: false
    };
  } else {
    return state;
  }
}
