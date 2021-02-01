import React, {
  useState
} from 'react';

import {
  Feed
} from './Feed';

// import {
//   Search
// } from './Search';

import {
  ErrorHandler
} from '../ErrorHandler';

// ...
// To simulate failure while lazy-loading module:
// 
// const SearchComponent = React.lazy(() => import('./Search').then(() => new Promise.reject()));

const SearchComponent = React.lazy(() => import('./Search'));

function SearchFallback() {
  return 'Could not load Search';
}

function Search() {
  return (
    <ErrorHandler Fallback={SearchFallback}>
      <React.Suspense fallback={'Loading Search...'}>
        <SearchComponent />
      </React.Suspense>
    </ErrorHandler>
  )
}

// ...

const views = {
  Feed,
  Search
};

// ...

export function Content() {
  const [view, setView] = useState('Feed');

  const View = views[view];
  const entries = Object.entries(views);

  return (
    <>
      <nav style={{ marginBottom: 50 }}>
        {entries.map(([key], index) => (
          <a
            key={key} 
            href 
            style={{ 
              cursor: 'pointer',
              color: key === view ? 'black' : 'gray'
            }} 
            onClick={() => setView(key)}>{key} {index !== entries.length -1 && ' | '}</a>
        ))}
      </nav>
      <View />
    </>
  )
}