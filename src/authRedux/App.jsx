import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Provider
} from 'react-redux';

import {
  Navigation,
  NotFound,
  RouteGuard
} from './components';

import {
  Home,
  Login,
  Users
} from './pages';

import {
  getStore
} from './store';

const store = getStore({
  auth: {
    user: null,
    loginError: false
  },
  users: {
    data: null,
    status: 'idle'
  }
});

// ...

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation
          links={[
            { href: '/', name: 'Home' },
            { href: '/users', name: 'Users' }
          ]}
          style={{
            marginBottom: 50
          }}
        />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <RouteGuard path="/users" component={Users} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}