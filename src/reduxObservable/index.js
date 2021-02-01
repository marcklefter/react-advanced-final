import React from 'react';

import { 
  Provider 
} from 'react-redux';

import store from './store';
import AppComponent from './App';

export function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
}