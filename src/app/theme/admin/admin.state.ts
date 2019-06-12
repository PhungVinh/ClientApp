import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/core.state';
import { UserState, userReducer } from './single-page-on/tabs/reducers/user.reducer';
import { organizationReducer, OrganizationState } from './single-page-on/tabs/reducers/organization.reducer';
import { authorityReducer, AuthorityState } from './single-page-on/tabs/reducers/authority.reducer';
import { CategoryPositionState, categoryPositionReducer } from './single-page-on/tabs/reducers/category-position.reducer';
import { CategoryDepartmentState, categoryDepartmentReducer } from './single-page-on/tabs/reducers/category-department.reducer';
import { ConsState, inforFieldReducer } from './single-page-on/tabs/reducers/information-field.reducer';
import { moduleReducer, ModuleState } from './single-page-on/tabs/reducers/module.reducer';
import { attrRelationReducer, AttrRelationState } from './single-page-on/tabs/reducers/attr-relation.reducer';
import { CustomerState, customerReducer } from './single-page-on/tabs/reducers/customer.reducer';
import { categoryReducer, CategoryState } from './single-page-on/tabs/reducers/category.reducer';
import { AttrReducer, AttrState } from './single-page-on/tabs/reducers/attributes.reducer';
import { CategoryOrganizationReducer, CategoryOrganizationState } from './single-page-on/tabs/reducers/category-organization.reducer';
import {profileReducer, ProfileState} from './single-page-on/tabs/reducers/profile.reducer';
import { EncryptionState, encryptionReducer } from './single-page-on/tabs/reducers/encryption.reducer';


export const FEATURE_NAME = 'admin';
export const selectAdmin = createFeatureSelector<State, AdminState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<AdminState> = {
  userState: userReducer,
  organization: organizationReducer,

  authority: authorityReducer,
  customerState: customerReducer,
  encryption: encryptionReducer,
  categoryPositionState: categoryPositionReducer,
  categoryDepartmentState: categoryDepartmentReducer,
  constraints: inforFieldReducer,
  module: moduleReducer,
  attrRelation: attrRelationReducer,
  category: categoryReducer,
  attrState: AttrReducer,
  categoryOrganization: CategoryOrganizationReducer,
  profile: profileReducer,

};

export interface AdminState {
  userState: UserState;
  organization: OrganizationState;
  authority: AuthorityState;
  profile: ProfileState;
  encryption: EncryptionState;
  customerState: CustomerState;
  categoryOrganization: CategoryOrganizationState;
  categoryPositionState: CategoryPositionState;
  categoryDepartmentState: CategoryDepartmentState;
  constraints: ConsState;
  module: ModuleState;
  attrRelation: AttrRelationState;
  category: CategoryState;
  attrState: AttrState;
}

export interface State extends AppState {
  admin: AdminState;
}
