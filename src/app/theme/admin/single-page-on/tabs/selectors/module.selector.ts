import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectModule = createSelector(
    selectAdmin,
    (state: AdminState) => state.module.listModule,
);
