import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import { selectAuthState } from '../../../../../core/core.state';
import { AuthState } from '../../../../../core/auth/auth.models';

export const selectUser = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.users,
);

export const selectUserById = (userId: any) => createSelector(
  selectAdmin,
  (state: AdminState) => (state.userState.users ? state.userState.users.filter(item => item.id === userId): [])
);

// export const selectConstraintsById = (constrainId?: any) => createSelector(
//   selectAdmin,
//   (state: AdminState) => (state.attrRelation.listAttrRelation ? state.attrRelation.listAttrRelation.data.filter(item => item.id === constrainId) : [])
// );

export const selectUserUpdate = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.load,
);

// export const selectUserById = createSelector(
//   selectAdmin,
//   (state: AdminState) => state.userState.selectUsers,
// );

export const selectUserCreate = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.load,
);

export const selectListUserByAuthorityId =  createSelector(
  selectAdmin,
  (state: AdminState) => {
    return state.userState.listUserByAuthority;
  }
)

export const selectServicePackUser = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.servicePack,
);

export const selectResetPassword = createSelector(
    selectAdmin,
    (state: AdminState) => state.userState,
);

export const selectError = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.err,
);

export const selectAuthorityPack = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.authorityPack,
);

export const selectAuthorityPackById = createSelector(
  selectAdmin,
  (state: AdminState) => state.userState.authorityPackById,
);