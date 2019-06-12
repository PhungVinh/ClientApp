
import { CategoryDepartmentActions, CategoryDepartmentActionTypes } from '../actions/category-department.actions';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { ICategoryDepartment } from 'src/app/shared/model/category-department.model';

export interface CategoryDepartmentState {
  categoryDepartment?: ICategoryDepartment[];
  pagination?: Pagination;
  load?: boolean;
  err?: any;
}

export const initialState: CategoryDepartmentState = {

};

export function categoryDepartmentReducer(state = initialState, action: CategoryDepartmentActions): CategoryDepartmentState {
  // console.table('action', action, state);
  switch (action.type) {
    case CategoryDepartmentActionTypes.LoadCategoryDepartments:
      return {
        ...state,
      };

    case CategoryDepartmentActionTypes.LoadCategoryDepartmentsSuccess:
      return {
        ...state,
        categoryDepartment: action.payload.data,
      }

    case CategoryDepartmentActionTypes.LoadCategoryDepartmentsFaild:
      return {
        ...state,
        err: action.payload.err
      };

    default:
      return state;
  }
}
