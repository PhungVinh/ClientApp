import { Action } from '@ngrx/store';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { CategoryPosition } from '../../../../../shared/model/category-position.model';

export enum CategoryPositionActionTypes {
  LoadCategoryPositions = '[CategoryPosition] Load CategoryPositions',
  LoadCategoryPositionsSuccess= '[CategoryPosition] Load CategoryPositions success',
  LoadCategoryPositionsFaild ='[CategoryPosition] Load CategoryPosition Faild',
  
}

export class LoadCategoryPositions implements Action {
  readonly type = CategoryPositionActionTypes.LoadCategoryPositions;
  constructor(readonly payload: { pagination: Pagination }) { }
}

export class LoadCategoryPositionsSuccess implements Action {
  readonly type = CategoryPositionActionTypes.LoadCategoryPositionsSuccess;
  constructor(readonly payload: {data: any, pagination: Pagination}) {}
}

export class LoadCategoryPositionsFaild  implements Action {
  readonly type = CategoryPositionActionTypes.LoadCategoryPositionsFaild;
  constructor(readonly payload: {err: any}) {}
}

export type CategoryPositionActions = LoadCategoryPositions
  | LoadCategoryPositionsSuccess
  |LoadCategoryPositionsFaild
;
