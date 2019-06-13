import { Action } from '@ngrx/store';
import {Pagination} from '../../../../../shared/model/pagination.model';

export enum AttrRelationActionTypes {
  LoadAttrRelations = '[AttrRelation] Load AttrRelations',
  LoadAttrRelationsSuccess = '[AttrRelation] Load AttrRelations Success',
  AddAttrRelations = '[AttrRelation] Add AttrRelations',
  AddAttrRelationsSuccess = '[AttrRelation] Add AttrRelations Success',
  AddAttrRelationsFailed = '[AttrRelation] Add AttrRelations Failed',
  UpdateAttrRelations = '[AttrRelation] Update AttrRelations',
  UpdateAttrRelationsSuccess = '[AttrRelation] Update AttrRelations Success',
  UpdateAttrRelationsFailed = '[AttrRelation] Update AttrRelations Failed',
  DeleteAttrRelations = '[AttrRelation] Delete AttrRelations',
  DeleteAttrRelationsSuccess = '[AttrRelation] Delete AttrRelations Success',
}

export class LoadAttrRelations implements Action {
  readonly type = AttrRelationActionTypes.LoadAttrRelations;
    constructor(public payload: {pagination: Pagination}) {}
}

export class LoadAttrRelationsSuccess implements Action {
    readonly type = AttrRelationActionTypes.LoadAttrRelationsSuccess;
    constructor(public payload: {data: any, pagination: Pagination}) {}
}

export class AddAttrRelations implements Action {
    readonly type = AttrRelationActionTypes.AddAttrRelations;
    constructor(public payload: {data: any}) {}
}

export class AddAttrRelationsSuccess implements Action {
    readonly type = AttrRelationActionTypes.AddAttrRelationsSuccess;
    constructor(public payload: {data: any}) {}
}

export class AddAttrRelationsFailed  implements Action {
    readonly type = AttrRelationActionTypes.AddAttrRelationsFailed;
    constructor(readonly payload: {err: any}) {}
}

export class UpdateAttrRelations implements Action {
    readonly type = AttrRelationActionTypes.UpdateAttrRelations;
    constructor(public payload: {data: any}) {}
}

export class UpdateAttrRelationsSuccess implements Action {
    readonly type = AttrRelationActionTypes.UpdateAttrRelationsSuccess;
    constructor(public payload: {data: any}) {}
}

export class UpdateAttrRelationsFailed  implements Action {
    readonly type = AttrRelationActionTypes.UpdateAttrRelationsFailed;
    constructor(readonly payload: {err: any}) {}
}

export class DeleteAttrRelations implements Action {
    readonly type = AttrRelationActionTypes.DeleteAttrRelations;
    constructor(public payload: {Id: number}) {}
}

export class DeleteAttrRelationsSuccess implements Action {
    readonly type = AttrRelationActionTypes.DeleteAttrRelationsSuccess;
}

export type AttrRelationActions = LoadAttrRelations 
| LoadAttrRelationsSuccess 
| AddAttrRelations 
| AddAttrRelationsSuccess 
| UpdateAttrRelations 
| UpdateAttrRelationsSuccess 
| UpdateAttrRelationsFailed
| DeleteAttrRelations 
| DeleteAttrRelationsSuccess 
| AddAttrRelationsFailed;
