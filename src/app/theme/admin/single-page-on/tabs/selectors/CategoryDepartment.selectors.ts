import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectCategoryDepartment = createSelector(
    selectAdmin,
    (state: AdminState) => state.categoryDepartmentState.categoryDepartment,
);