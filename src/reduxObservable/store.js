import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';

import { 
  createEpicMiddleware 
} from 'redux-observable';

import {
  searchEpic
} from './epics';

import {
  root as rootReducer
} from './reducers';

// ...

const composeEnhancer 
  = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer, 
    composeEnhancer(
      applyMiddleware(epicMiddleware)
    )
);

epicMiddleware.run(searchEpic);

export default store;