import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import {selectAuthState} from '../../../../../core/core.state';
import {AuthState} from '../../../../../core/auth/auth.models';

export const selectCate = createSelector(
    selectAdmin,
    (state: AdminState) => state.constraints.listcate,
);

export const selectCategory = createSelector(
    selectAdmin,
    (state: AdminState) => {
        return state.category.categories
    }
);
export const selectErrorCategory = createSelector(
    selectAdmin,
    (state: AdminState) => state.category.err
)
