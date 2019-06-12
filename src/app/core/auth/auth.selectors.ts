import { createSelector } from '@ngrx/store';
import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';
import { getMenuRecursiveByCode } from '../../shared/util/common.util';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
export const selectAccount = createSelector(
  selectAuthState,
  (state: AuthState) => state.account
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectMenu = createSelector(
  selectAuthState,
  (state: AuthState) => state.menu
);

export const selectTab = createSelector(
  selectAuthState,
  (state: AuthState) => state.tabs
);

export const selectActivedTab = createSelector(
  selectAuthState,
  (state: AuthState) => state.tab
);

export const selectTabByCode = createSelector(
  selectAuthState,
  (state: AuthState, param: { tabCode: string; fromRoot?: boolean; }) => getMenuRecursiveByCode(param, state.menu)
);

export const selectTabArgs = createSelector(
  selectAuthState,
  (state: AuthState) => state.tabArgs
);

export const selectIsChangePassword = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsChange = createSelector(
  selectAuthState,
  (state: AuthState) => state.change
);

export const selectResetPasswordFinish = createSelector(
  selectAuthState,
  (state: AuthState) => state.resetErr
);

export const selectCheckResetPasswordFinish = createSelector(
  selectAuthState,
  (state: AuthState) => state.ressetPasswordFinish
);

export const getPermissionCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.permission
)

export const getCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.account && state.account.userName
)