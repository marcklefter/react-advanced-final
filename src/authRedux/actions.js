import axios from 'axios';

export const authLoginSuccess = user => ({
  type: 'auth/loginSuccess',
  payload: user
});

export const authLoginFailure = () => ({
  type: 'auth/loginFailure'
});

export const authLogout = () => ({
  type: 'auth/logout'
});

// ...
// Actions related to fetching data (users).

const usersRequest = () => ({
  type: 'users/request'
});

const usersSuccess = data => ({
  type: 'users/success',
  payload: data
});

export const usersFetch = () => {
  return async (dispatch, getState) => {
    dispatch(usersRequest());

    const result = await axios('https://jsonplaceholder.cypress.io/users');
    dispatch(usersSuccess(result.data));
  }
}