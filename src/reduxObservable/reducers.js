import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from './actions';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export function root(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,

        loading: true
      };

    case SEARCH_SUCCESS:
      return {
        loading: false,
        results: action.results
      };

    case SEARCH_FAILURE:
      return {
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}