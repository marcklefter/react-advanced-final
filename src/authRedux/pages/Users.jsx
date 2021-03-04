import {
  useEffect
} from 'react';

import {
  Link,
  Redirect,
  Route,
  useRouteMatch
} from 'react-router-dom';

import {
  connect 
} from 'react-redux';

import {
  User
} from '../components';

import {
  usersFetch
} from '../actions';

let Users = ({ users, status, usersFetch }) => {
  const {
    path,
    url
  } = useRouteMatch();

  useEffect(() => {
    usersFetch();
  }, [usersFetch]);

  if (status === 'idle' || status === 'loading') {
    return 'Loading users...';
  }

  return (
    <>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${url}/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <Route path={`${path}/:id`} render={({ match }) => {
        const user = users.find(user => user.id === +match.params.id);

        return user
          ? <User user={user} />
          : <Redirect to="/users" />
      }} />
    </>
  )
}

Users = connect(
  ({ users }) => ({
    users: users.data,
    status: users.status
  }),
  {
    usersFetch
  }
)(Users);

export { Users };