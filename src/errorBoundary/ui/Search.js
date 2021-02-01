import React, {
  useMemo,
  useRef,
  useState
} from 'react';

import _ from 'lodash';

import {
  AppError 
} from '../AppError';

import {
  ErrorHandler 
} from '../ErrorHandler';

// ...

const QueryFail = 'fail';

function SearchFallback() {
  return 'A search error occurred';
}

function SearchEngine({ query }) {
  if (!query) {
    return null;
  }

  if (query.toLowerCase() === QueryFail) {
    // note: Pass an error boundary id of 'root' to have the error propagate to the top-level boundary.
    throw new AppError('Search failed for query "' + query + '"', '');
  }

  return `Search: ${query}`;
}

export function Search() {
  const [query, setQuery] = useState('');

  const debouncedSetQuery = useMemo(
    () => _.debounce(
      value => setQuery(value),
      400
    ),
    []
  );

  const inputRef = useRef();
    
  return (
    <div>
      <input 
        ref={inputRef}
        placeholder="Search"
        onChange={() => debouncedSetQuery(inputRef.current.value)}
      />

      <div style={{
        marginTop: 50
      }}>
        <ErrorHandler Fallback={SearchFallback}>
          <SearchEngine query={query} />
        </ErrorHandler>
      </div>
    </div>
  )
}