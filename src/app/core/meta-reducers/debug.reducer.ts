import { ActionReducer } from '@ngrx/store';

import { AppState } from '../core.state';

/**
 * browsing all action dispatch or be auto dispatched.
 * turn on console debug action
 * @param reducer reducer of current action dispatch
 * @author daibh
 * @readonly please don't change anything before confirm this file activity
 */
export function debug(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state, action) {
    const newState = reducer(state, action);
    console.log(`[DEBUG] action: ${action.type}`, {
      payload: (<any>action).payload,
      oldState: state,
      newState
    });
    return newState;
  };
}
