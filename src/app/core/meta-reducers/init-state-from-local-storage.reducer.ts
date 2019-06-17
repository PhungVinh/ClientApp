import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthActionTypes } from '../auth/auth.actions';

/**
 * browsing all action dispatch or be auto dispatched
 * process state after any action was dispatched
 * @param reducer reducer of current action dispatch
 * @author daibh
 * @readonly please don't change anything before confirm this file activity
 */
export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    if (action.type === AuthActionTypes.LOGOUT) { // process re-initial all state after logout system
      return reducer(undefined, action);
    }
    // get current reducer state
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) { // load initial state from cache
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}
