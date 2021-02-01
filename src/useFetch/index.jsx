import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';

import axios from 'axios';

// ...

export function fetchUser(id, delayMs = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () => {
        try {
          resolve((await axios(`http://jsonplaceholder.typicode.com/users/${id}`)).data);
        } catch (error) {
          reject(error);
        }
      },
      delayMs
    );
  });
}

// ...

const baseStyle = {
  textAlign: 'center'
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20
};

// ...

function useFetch(fetcher, options) {
  const [fetchState, setFetchState] = useState({
    loading: false,
    data: null,
    error: null
  });

  const setState = partialState => {
    setFetchState(prevState => ({
      ...prevState,
      ...partialState
    }));
  };

  useEffect(() => {
    setState({
      loading: true,
      data: null
    });

    fetcher()
      .then(result => setState({
        loading: false,
        data: result
      }))
      .catch(error => setState({
        loading: false,
        error
      }));
  }, [fetcher, options]);

  return fetchState;
}

// ...

function Input({ setUser }) {
  const [userId, setUserId] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();

    setUser(userId);
  };

  const handleChange = e => {
    setUserId(+e.target.value);
  };

  return (
    <div style={inputStyle}>
      <form onSubmit={handleSubmit}>
        <input
          value={userId}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export function App() {
  const [user, setUser] = useState(1);

  const {
    loading,
    data,
    error
  } = useFetch(
    useCallback(() => fetchUser(user), [user]),

    // note: Since the object has the same content across renders, it may alternatively be declared outside the 
    // component, obviating the need for useMemo in this case.
    useMemo(() => ({}), []) 
  );

  return (
    <>
      <Input setUser={setUser} />
      <div style={baseStyle}>
        {loading && 'Loading...'}
        {error && `${error}`}
        {data && (
          <p>Name: {data.name}</p>
        )}
      </div>
    </>
  )
}