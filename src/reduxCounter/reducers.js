import {
  combineReducers
} from 'redux';

// ...

function counterReducer(state = null, action) {
  switch (action.type) {
    case 'counter/update':
      return {
        ...state,
        value: state.value + state.incBy
      };

    case 'counter/setIncBy':
      return {
        ...state,
        incBy: action.payload
    };

    default:
      return state;
  }
}

function updatesReducer(state = 0, action) {
  switch (action.type) {
    case 'counter/update':
      return ++state;

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  updates: updatesReducer
});