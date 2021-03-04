import {
  Redirect,

  useLocation
} from 'react-router-dom';

import {
  connect
} from 'react-redux';

import {
  authLoginSuccess,
  authLoginFailure
} from '../actions';

let Login = ({ user, loginError, authLoginSuccess, authLoginFailure }) => {
  const location = useLocation();
  
  if (user) {
    const redirectTo = location.state?.from ?? '/';

    return <Redirect to={redirectTo} />;
  }

  // ...
  // Helper method.
  const login = async (credential) => {
    if (credential === 'admin') {
      authLoginSuccess(credential);
    } else {
      authLoginFailure();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    login(e.target.login.value);
  };

  return (
    <>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input id="login" />
      </form>
      {loginError && 'Login was incorrect'}
    </>
  )
}

Login = connect(
  ({ auth }) => ({
    user: auth.user,
    loginError: auth.loginError
  }),
  {
    authLoginSuccess,
    authLoginFailure
  }
)(Login);

export { Login };