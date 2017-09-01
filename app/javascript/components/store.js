import { createStore } from 'redux';

function reducer(state = {}, action) {
  return {
    boards: boardsReducer(state.boards, action)
  };
}

function boardsReducer(state = [{
  id: 1,
  title: "Website Development"
}, {
  id: 2,
  title: "Recipes"
}, {
  id: 3,
  title: "Weekend Projects"
}, {
  id: 4,
  title: "Legal Stuff"
}, {
  id: 5,
  title: "Running Amuck"
}]) {
  return state;
}

const store = createStore(reducer);

export default store;
