/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const undoableInjectedReducers = _.reduce(
    injectedReducers,
    (acc, val, key) => {
      acc[key] = val;
      return acc;
    },
    injectedReducers,
  );

  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...undoableInjectedReducers,
  });

  return rootReducer;
}
