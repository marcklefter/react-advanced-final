import {
  Provider
} from 'react-redux';

import {
  getStore 
} from './store';

import Counter from './Counter';

// ...

const store = getStore({
  counter: {
    value: 0,
    incBy: 1
  },
  updates: 0
});

// ...

export function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}