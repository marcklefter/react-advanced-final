import {
  useState,
  useMemo
} from 'react';

import _ from 'lodash';

import {
  fetchUser
} from '../shared/util';

import {
  useTask
} from '../shared/useTask';

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

export function App() {
  const [userId, setUserId] = useState(1);

  const {
    status,
    result: user,
    error,
    run
  } = useTask();

  const debounceTask = useMemo(
    () => _.debounce(
      userId => {
        run(fetchUser(userId));
      }, 
      1000
    ),
    [run]
  );
  
  const handleChange = e => {
    const userId = +e.target.value;

    setUserId(userId);

    debounceTask(userId);
  };

  return (
    <>
      <div style={inputStyle}>
        <input
          type="number"
          value={userId}
          onChange={handleChange}
        />
      </div>

      <div style={baseStyle}>
        {status === 'pending' && 'Loading...'}
        {status === 'rejected' && `${error}`}
        {status === 'resolved' && (
          <p>Name: {user.name}</p>
        )}
      </div>
    </>
  )
}