import React from 'react';

import {
  connect
} from 'react-redux';

import { 
  Redirect,
  Route
} from 'react-router-dom';

// use this component, instead of the regular <Route> component from the React Router library, when a route is to be
// protected (= requiring user authentication).
let RouteGuard = ({ user, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      user
        ? <Component {...props} />
        : <Redirect to={{
            pathname: "/login",
            state: {
              from: props.location
            }
          }} />
    )}
    />
  );
}

RouteGuard = connect(
  ({ auth }) => ({
    user: auth.user
  })
)(RouteGuard);

export { RouteGuard }