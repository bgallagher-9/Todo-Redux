import { createStore } from 'redux';

const GET_ITEMS = { type: 'GET_ITEMS' };
const RETURN_CLEAR = { type: 'RETURN_CLEAR' };
const INPUT_CHANGE = { type: 'INPUT_CHANGE' };

const beginState = {
  todovalue: '',
  items: []
};

const todoReducer = (state = beginState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return { todovalue: action.value };
    case 'RETURN_CLEAR':
      return { todovalue: '' };
    case 'GET_ITEMS':
      return { items: action.items };
  }
  return state;
}

const store = createStore(todoReducer);

module.exports = {
  store: store,
  actions: {
    GET_ITEMS: GET_ITEMS,
    RETURN_CLEAR: RETURN_CLEAR,
    INPUT_CHANGE: INPUT_CHANGE
  }
};
