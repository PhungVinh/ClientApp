import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import {selectAuthState} from '../../../../../core/core.state';
import {AuthState} from '../../../../../core/auth/auth.models';

export const selectConstraints = createSelector(
    selectAdmin,
    (state: AdminState) => state.constraints.id
);

export const selectConstraintsPagi = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrRelation.listAttrRelation
);

export const selectConstraintsById = (constrainId?: any) => createSelector(
    selectAdmin,
    (state: AdminState) => (state.attrRelation.listAttrRelation ? state.attrRelation.listAttrRelation.data.filter(item => item.Id === constrainId) : [])
);

export const selectCateChildByParent = (cateId?: any) => createSelector(
    selectAdmin,
     (state: AdminState) => (state.constraints.listcateChild ? state.constraints.listcateChild.filter(item => item.CategoryTypeCode === cateId) : [])
);

export const selectCateChildNull = () => createSelector(
    selectAdmin,
    (state: AdminState) => (state.constraints.listcateChild ? state.constraints.listcateChild.filter(item => item.CategoryTypeCode === 0) : [])
);

export const selectCategory = createSelector(
    selectAdmin,
    (state: AdminState) => state.constraints.listcate
);

export const selectFormConfig = createSelector(
    selectAdmin,
    (state: AdminState) => state.constraints.formConfig
);

export const addAttrRelationFailed = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrRelation.errOrg
);

export const updateAttrRelationFailed = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrRelation.errOrg
);

export const selectError = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrRelation.errOrg,
  );


