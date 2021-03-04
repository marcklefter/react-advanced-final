import { 
  applyMiddleware,
  createStore
} from 'redux';

import { 
  composeWithDevTools 
} from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
  rootReducer 
} from './reducers';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
);

let store;

export function getStore(initialState) {
  if (!store) {
    store = createStore(rootReducer, initialState, composedEnhancer);
  }

  return store; 
}