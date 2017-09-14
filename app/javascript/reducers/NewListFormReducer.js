const initialState = {
  isSaving: false,
  display: false,
  title: ''
};

export default function NewListFormReducer(state = initialState, action) {
  if (action.type === "SHOW_CREATE_LIST_FORM") {
    return { ...state, display: true };
  } else if (action.type === "HIDE_CREATE_LIST_FORM") {
    return { ...state, display: false };
  } else if (action.type === "UPDATE_CREATE_LIST_FORM_INPUT_TEXT") {
    return {
      ...state,
      title: action.text
    };
  } else if (action.type === "CREATE_LIST_REQUEST") {
    return {
      ...state,
      isSaving: true
    };
  } else if (action.type === "CREATE_LIST_SUCCESS") {
    return {
      ...state,
      isSaving: false,
      display: false
    }
  } else {
    return state;
  }
}
