export const SEARCH_QUERY   = 'SEARCH_QUERY';
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export const searchQuery = query => ({
  type: SEARCH_QUERY,
  query
});

export const searchRequest = () => ({
  type: SEARCH_REQUEST
});

export const searchSuccess = results => ({
  type: SEARCH_SUCCESS,
  results
});

export const searchFailure = error => ({
  type: SEARCH_FAILURE,
  error
});