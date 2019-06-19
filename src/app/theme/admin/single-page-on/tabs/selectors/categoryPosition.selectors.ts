import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectCategoryPosition= createSelector(
    selectAdmin,
    (state: AdminState) => state.categoryPositionState.categoryPosition,
  );
  
  