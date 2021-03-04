import { 
  createStore
} from 'redux';

import { 
  composeWithDevTools 
} from 'redux-devtools-extension';

import {
  rootReducer 
} from './reducers';

const composedEnhancer = composeWithDevTools();

let store;

export function getStore(initialState) {
  if (!store) {
    store = createStore(rootReducer, initialState, composedEnhancer);
  }

  return store; 
}