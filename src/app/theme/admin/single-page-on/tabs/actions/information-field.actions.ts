import {Action} from '@ngrx/store';

export enum InformationFieldActionTypes {
    LoadInformationFields = '[InformationField] Load InformationFields',
    LoadInformationFieldsSuccess = '[InformationField] Load InformationFields Success',
    LoadConstraints = '[InformationField] Load Constraints',
    LoadConstraintsSuccess = '[InformationField] success Constraints',
    LoadCategoryLink = '[InformationField] Load CategoryLink',
    LoadCategoryLinkSuccess = '[InformationField] Load CategoryLink Success',
    LoadCategoryChildLink = '[InformationField] Load CategoryChildLink',
    LoadCategoryChildLinkSuccess = '[InformationField] Load CategoryChildLink Success',
    UpdateInformationField = '[InformationField] Update InformationField',
    UpdateInformationFieldSuccess = '[InformationField] Update InformationField Success',
}

export class LoadInformationFields implements Action {
    readonly type = InformationFieldActionTypes.LoadInformationFields;
}

export class LoadInformationFieldsSuccess implements Action {
    readonly type = InformationFieldActionTypes.LoadInformationFieldsSuccess;
    constructor(public payload: { formConfig: any }) {
    }
}

export class LoadConstraints implements Action {
    readonly type = InformationFieldActionTypes.LoadConstraints;
}

export class LoadConstraintsSuccess implements Action {
    readonly type = InformationFieldActionTypes.LoadConstraintsSuccess;

    constructor(public payload: { listConstraints: any }) {
    }
}

export class LoadCategoryLink implements Action {
    readonly type = InformationFieldActionTypes.LoadCategoryLink;
}

export class LoadCategoryLinkSuccess implements Action {
    readonly type = InformationFieldActionTypes.LoadCategoryLinkSuccess;

    constructor(public payload: { listCate: any[] }) {
    }
}

export class LoadCategoryChildLink implements Action {
    readonly type = InformationFieldActionTypes.LoadCategoryChildLink;
}

export class LoadCategoryChildLinkSuccess implements Action {
    readonly type = InformationFieldActionTypes.LoadCategoryChildLinkSuccess;

    constructor(public payload: { listCateChild: any[] }) {
    }
}

export class UpdateInformationField implements Action {
    readonly type = InformationFieldActionTypes.UpdateInformationField;
    constructor(public payload: { informationForm: any }) {
    }
}

export class UpdateInformationFieldSuccess implements Action {
    readonly type = InformationFieldActionTypes.UpdateInformationFieldSuccess;
    constructor(public payload: { informationForm: any }) {
    }
}


export type InformationFieldActions = LoadInformationFields
    | LoadConstraints
    | LoadConstraintsSuccess | LoadCategoryLink | LoadCategoryLinkSuccess | LoadCategoryChildLink | LoadCategoryChildLinkSuccess | UpdateInformationField | UpdateInformationFieldSuccess | LoadInformationFieldsSuccess
    ;
