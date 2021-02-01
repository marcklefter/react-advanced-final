import React, {
  useState
} from 'react';

import {
  connect
} from 'react-redux';

import {
  searchQuery
} from './actions';

function App({ loading, results, error, searchQuery }) {
  const [query, setQuery] = useState('');

  const onChange = event => {
    searchQuery(event.target.value);

    setQuery(event.target.value);
  };

  let element;
  if (loading) {
    element = <p>Loading...</p>;
  } else if (results) {
    element = (
      <ul>
        {results.map((result, i) => (
        <li key={i}>
          <a href={result.uri} key={i}>{result.name}</a>
        </li>
        ))}
      </ul>
    )
  } else if (error) {
    element = <p>An error occurred: {error.message}</p>
  } else {
    element = null;
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      {element}
    </>
  )
}

export default connect(
  ({ loading, results, error }) => ({
    loading,
    results,
    error
  }),
  {
    searchQuery
  }
)(App)