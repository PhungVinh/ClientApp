import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import { selectAuthState } from '../../../../../core/core.state';
import { AuthState } from '../../../../../core/auth/auth.models';

export const selectCatrgoryDepartment = createSelector(
    selectAdmin,
    (state: AdminState) => state.categoryDepartmentState.categoryDepartment,
);