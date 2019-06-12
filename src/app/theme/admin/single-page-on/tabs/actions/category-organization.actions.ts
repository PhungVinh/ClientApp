import { Action } from '@ngrx/store';
import { Pagination } from '../../../../../shared/model/pagination.model';

export enum CategoryOrganizationActionTypes {
  LoadCategoryOrganizations = '[CategoryOrganization] Load CategoryOrganizations',
  LoadCategoryOrganizationsSuccess = '[CategoryOrganization] Load CategoryOrganizations Success',
  LoadCategoryOrganizationsFaild = '[CategoryOrganization] load CategoryOrganizations Faild',

}

export class LoadCategoryOrganizations implements Action {
  readonly type = CategoryOrganizationActionTypes.LoadCategoryOrganizations;
  constructor(readonly payload: { pagination: Pagination }) { }
}

export class LoadCategoryOrganizationsSuccess implements Action {
  readonly type = CategoryOrganizationActionTypes.LoadCategoryOrganizationsSuccess;
  constructor(readonly payload: { data: any, pagination: Pagination }) { }
}

export class LoadCategoryOrganizationsFaild implements Action {
  readonly type = CategoryOrganizationActionTypes.LoadCategoryOrganizationsFaild;
  constructor(readonly payload: { err: any }) { }
}


export type CategoryOrganizationActions = LoadCategoryOrganizations
  | LoadCategoryOrganizationsSuccess
  | LoadCategoryOrganizationsFaild
  ;
