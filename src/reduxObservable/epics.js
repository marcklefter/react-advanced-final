import {
  of,
  concat
} from 'rxjs';

import {
  debounceTime,
  distinctUntilKeyChanged,
  map,
  switchMap,
  filter,
  catchError
} from 'rxjs/operators';

import {
  ajax
} from 'rxjs/ajax';

import {
  ofType
} from 'redux-observable';

import {
  SEARCH_QUERY,
  searchRequest,
  searchSuccess,
  searchFailure
} from './actions';

// ...
// Spotify API OAuth token - get a token (requires a Spotify account) @ https://developer.spotify.com/console/get-search-item!
const token = '';

// an "epic" takes a stream of actions and returns another stream of actions.
const searchEpic = action$ =>
  action$.pipe(
    // only handle the SEARCH_QUERY action type.
    ofType(SEARCH_QUERY),

    // debounce ("delay") the processing of the action by 500 ms.
    debounceTime(500),

    // filter out actions that have an empty query string.
    filter(action => !!action.query),

    // current query must be distinct from the previous query.
    distinctUntilKeyChanged('query'),

    // "switch over" from the original stream of SEARCH_QUERY actions to a new Observable stream that produces the 
    // following actions: SEARCH_REQUEST, SEARCH_SUCCESS and (in case of error) SEARCH_FAILURE.
    switchMap(action => concat(
      // dispatch a SEARCH_REQUEST action to the Redux store.
      of(searchRequest()),

      // invoke the Spotify API.
      ajax.getJSON(
        `https://api.spotify.com/v1/search?q=${action.query}&type=track`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      )
      .pipe(
        // map over (= process) the response and dispatch a SEARCH_SUCCESS action with the search results to the 
        // Redux store.
        map(
          response => searchSuccess(response.tracks.items.map(({ name, uri }) => ({
            name,
            uri
          })))
        ),

        // if an error occurs when calling the Spotify API, dispatch a SEARCH_FAILURE to the Redux store.
        catchError(error => of(searchFailure(error)))
      )
    ))
  );

export { searchEpic };