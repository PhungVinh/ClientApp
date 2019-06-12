import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectProfileUpdateFaild = createSelector(
  selectAdmin,
  (state: AdminState) => state.profile.errProfile,
);

export const selectProfileUpdateSuccess = createSelector(
    selectAdmin,
    (state: AdminState) => state.profile.loadProfile,
);

export const selectProfileLinkImage = createSelector(
    selectAdmin,
    (state: AdminState) => state.profile.linkImage,
);
