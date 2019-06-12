import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import {selectAuthState} from '../../../../../core/core.state';
import {AuthState} from '../../../../../core/auth/auth.models';

export const selectOrganization = createSelector(
  selectAdmin,
  (state: AdminState) => state.organization.organizations,
);
export const selectOrganizationUpdate = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.load,
);
export const selectInforOrganization = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.infoOrg,
);
export const selectCategoryAll = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.categoryAll,
);
export const selectGetLinkImage = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.linkImage,
);
export const selectServicePack = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.servicePack,
);
export const selectOrganizationUpdateFaild = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.errOrg,
);
export const selectOrganizationInforFaild = createSelector(
    selectAdmin,
    (state: AdminState) => state.organization.errInforOrg,
);
