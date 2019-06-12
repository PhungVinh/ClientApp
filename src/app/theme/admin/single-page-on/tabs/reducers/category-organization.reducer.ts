import { Action } from '@ngrx/store';
import { CategoryOrganizationActions, CategoryOrganizationActionTypes } from '../actions/category-organization.actions';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { IOrganization } from 'src/app/shared/model/organization.model';

export interface CategoryOrganizationState {
  categoryOrganizations?: any;
  pagination?: Pagination;
  load?: boolean;
  err?: any;
  param?: any;
}

export const initialState: CategoryOrganizationState = {

};

export function CategoryOrganizationReducer(state = initialState, action: CategoryOrganizationActions): CategoryOrganizationState {
  switch (action.type) {

    case CategoryOrganizationActionTypes.LoadCategoryOrganizations:
      return {
        ...state,
        param: action.payload.pagination
      };

    case CategoryOrganizationActionTypes.LoadCategoryOrganizationsSuccess:
      return {
        ...state,
        categoryOrganizations: action.payload.data,
      };

    case CategoryOrganizationActionTypes.LoadCategoryOrganizationsFaild:
      return {
        ...state,
        err: action.payload.err
      }

    default:
      return state;
  }
}
