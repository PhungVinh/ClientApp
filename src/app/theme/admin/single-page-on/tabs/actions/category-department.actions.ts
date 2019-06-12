import { Action } from '@ngrx/store';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { CategoryDepartment } from '../../../../../shared/model/category-department.model';

export enum CategoryDepartmentActionTypes {
  LoadCategoryDepartments = '[CategoryDepartment] Load CategoryDepartments',
  LoadCategoryDepartmentsSuccess= '[CategoryDepartment] Load CategoryDepartment success',
  LoadCategoryDepartmentsFaild ='[CategoryDepartment] Load CategoryDepartment Faild',
  
}

export class LoadCategoryDepartments implements Action {
  readonly type = CategoryDepartmentActionTypes.LoadCategoryDepartments;
  constructor(readonly payload: { pagination: Pagination }) { }
}

export class LoadCategoryDepartmentsSuccess implements Action {
  readonly type = CategoryDepartmentActionTypes.LoadCategoryDepartmentsSuccess;
  constructor(readonly payload: {data: any, pagination: Pagination}) {}
}

export class LoadCategoryDepartmentsFaild  implements Action {
  readonly type = CategoryDepartmentActionTypes.LoadCategoryDepartmentsFaild;
  constructor(readonly payload: {err: any}) {}
}


export type CategoryDepartmentActions = LoadCategoryDepartments
|LoadCategoryDepartmentsSuccess
|LoadCategoryDepartmentsFaild
;
