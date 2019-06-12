import {Action} from '@ngrx/store';

export enum AttributesActionTypes {
    LoadAttributess = '[Attributes] Load Attributess',
    LoadAttributessSuccess = '[Attributes] Load Attributess Success',
    LoadAttributesFormList = '[Attributes] Load AttributesFormList',
    LoadAttributesFormListSuccess = '[Attributes] Load AttributesFormList Success',
    LoadAttributesIsTableShow = '[Attributes] Load LoadAttributesIsTableShow',
    LoadAttributesIsTableShowSuccess = '[Attributes] Load LoadAttributesIsTableShow Success',
}

export class LoadAttributess implements Action {
    readonly type = AttributesActionTypes.LoadAttributess;
}

export class LoadAttributessSuccess implements Action {
    readonly type = AttributesActionTypes.LoadAttributessSuccess;

    constructor(public payload: { data: any }) {
    }
}

export class LoadAttributesFormList implements Action {
    readonly type = AttributesActionTypes.LoadAttributesFormList;
}

export class LoadAttributesFormListSuccess implements Action {
    readonly type = AttributesActionTypes.LoadAttributesFormListSuccess;

    constructor(public payload: { data: any }) {
    }
}

export class LoadAttributesIsTableShow implements Action {
    readonly type = AttributesActionTypes.LoadAttributesIsTableShow;
}

export class LoadAttributesIsTableShowSuccess implements Action {
    readonly type = AttributesActionTypes.LoadAttributesIsTableShowSuccess;

    constructor(public payload: { data: any }) {
    }
}


export type AttributesActions =
    LoadAttributess
    | LoadAttributessSuccess
    | LoadAttributesFormList
    | LoadAttributesFormListSuccess
    | LoadAttributesIsTableShow
    | LoadAttributesIsTableShowSuccess;
