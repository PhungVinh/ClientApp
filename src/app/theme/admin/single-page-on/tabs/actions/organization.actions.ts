import { Action } from '@ngrx/store';
import {Pagination} from '../../../../../shared/model/pagination.model';
import {Organization} from '../../../../../shared/model/organization.model';
import {ProfileActionTypes} from "./profile.actions";

export enum OrganizationActionTypes {
  LoadOrganizations = '[Organization] Load Organizations',
  LoadOrganizationsSuccess = '[Organization] Load Organizations success',
  LoadOrganizationsFaild = '[Organization] Load Organizations faild',
  OrganizationsCreate = '[Organization] Organizations create',
  OrganizationsUpdate = '[Organization] Organizations update',
  OrganizationsUpdateSuccess = '[Organization] Organizations update success',
  OrganizationsUpdateFaild = '[Organization] Organizations update faild',
  OrganizationsDelete = '[Organization] Organizations delete',
  OrganizationsUploadFile = '[Organization] Organizations upload file',
  OrganizationsUploadFileSuccess = '[Organization] Organizations upload file success',
  OrganizationsUploadFileFaild = '[Organization] Organizations upload file faild',
  LoadInforOrganizations = '[Organization] Load infor Organizations',
  LoadInforOrganizationsSuccess = '[Organization] Load infor Organizations success',
  LoadInforOrganizationsErr = '[Organization] Load infor Organizations err',
  LoadAllCategory = '[Organization] Load Category',
  LoadAllCategorySuccess = '[Organization] Load Category success',
  LoadAllCategoryFaild = '[Organization] Load Category faild',
  UploadFileOrganizations = '[Organization] Upload file organization',
  UploadFileOrganizationsSuccess = '[Organization] Upload file organization Success',
  UploadFileOrganizationsFaild = '[Organization] Upload file organization Faild',
  GetLinkImage = '[Image] Get link image',
  GetLinkImageSuccess = '[Image] Get link image success',
  GetLinkImageFaild = '[Image] Get link image Faild',
  OrganizationsInforUpdate = '[Organization] Organizations infor update',
  OrganizationsInforUpdateSuccess = '[Organization] Organizations infor update success',
  OrganizationsInforUpdateFaild = '[Organization] Organizations infor update faild',
  OrganizationsServicePack = '[Organization] Organizations service pack',
  OrganizationsServicePackSuccess = '[Organization] Organizations service pack success',
  OrganizationsServicePackFaild = '[Organization] Organizations service pack faild',
}

export class LoadOrganizations implements Action {
  readonly type = OrganizationActionTypes.LoadOrganizations;
    constructor(readonly payload: {pagination: Pagination}) {}
}

export class LoadOrganizationsSuccess implements Action {
    readonly type = OrganizationActionTypes.LoadOrganizationsSuccess;
    constructor(readonly payload: {data: any, pagination: Pagination}) {}
}

export class LoadOrganizationsFaild  implements Action {
    readonly type = OrganizationActionTypes.LoadOrganizationsFaild;
    constructor(readonly payload: {err: any}) {}
}

export class OrganizationsCreate implements Action {
    readonly type = OrganizationActionTypes.OrganizationsCreate;
    constructor(readonly payload: {oranization: any}) {}
}
export class OrganizationsUpdate implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUpdate;
    constructor(readonly payload: {oranization: any}) {}
}
export class OrganizationsDelete implements Action {
    readonly type = OrganizationActionTypes.OrganizationsDelete;
    constructor(readonly payload: {organizationId: number}) {}
}
export class OrganizationsUpdateSuccess implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUpdateSuccess;
    constructor(readonly payload: {data: boolean}) {}
}

export class OrganizationsUpdateFaild  implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUpdateFaild;
    constructor(readonly payload: {err: any}) {}
}

export class OrganizationsUploadFile implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUploadFile;
    constructor (readonly payload: {file: any}) {}
}

export class OrganizationsUploadFileSuccess implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUploadFileSuccess;
    constructor (readonly payload: {load: boolean}) {}
}

export class OrganizationsUploadFileFaild implements Action {
    readonly type = OrganizationActionTypes.OrganizationsUploadFileFaild;
    constructor (readonly payload: {err: any}) {}
}

export class LoadInforOrganizations implements Action {
    readonly type = OrganizationActionTypes.LoadInforOrganizations;
}
export class LoadInforOrganizationsSuccess implements Action {
    readonly type = OrganizationActionTypes.LoadInforOrganizationsSuccess;
    constructor (readonly payload: {data: any}) {}
}
export class LoadInforOrganizationsErr implements Action {
    readonly type = OrganizationActionTypes.LoadInforOrganizationsErr;
    constructor (readonly payload: {err: any}) {}
}

export class LoadAllCategory implements Action {
    readonly type = OrganizationActionTypes.LoadAllCategory;
}
export class LoadAllCategorySuccess implements Action {
    readonly type = OrganizationActionTypes.LoadAllCategorySuccess;
    constructor (readonly payload: {data: any}) {}
}
export class LoadAllCategoryFaild implements Action {
    readonly type = OrganizationActionTypes.LoadAllCategoryFaild;
    constructor (readonly payload: {err: any}) {}
}

export class UploadFileOrganizations implements Action {
    readonly type = OrganizationActionTypes.UploadFileOrganizations;
    constructor(readonly payload: {file: any}) {}
}

export class UploadFileOrganizationsSuccess implements Action {
    readonly type = OrganizationActionTypes.UploadFileOrganizationsSuccess;
    constructor(readonly payload: {data: boolean}) {}
}

export class UploadFileOrganizationsFaild  implements Action {
    readonly type = OrganizationActionTypes.UploadFileOrganizationsFaild;
    constructor(readonly payload: {err: any}) {}
}

export class GetLinkImage implements Action {
    readonly type = OrganizationActionTypes.GetLinkImage;
    constructor(readonly payload: any) {}
}

export class GetLinkImageSuccess implements Action {
    readonly type = OrganizationActionTypes.GetLinkImageSuccess;
    constructor(readonly payload: {data: any}) {}
}

export class GetLinkImageFaild  implements Action {
    readonly type = OrganizationActionTypes.GetLinkImageFaild;
    constructor(readonly payload: {err: any}) {}
}

export class OrganizationsInforUpdate implements Action {
    readonly type = OrganizationActionTypes.OrganizationsInforUpdate;
    constructor(readonly payload: any) {}
}

export class OrganizationsInforUpdateSuccess implements Action {
    readonly type = OrganizationActionTypes.OrganizationsInforUpdateSuccess;
    constructor(readonly payload: {data: boolean}) {}
}

export class OrganizationsInforUpdateFaild  implements Action {
    readonly type = OrganizationActionTypes.OrganizationsInforUpdateFaild;
    constructor(readonly payload: {err: any}) {}
}

export class OrganizationsServicePack implements Action {
    readonly type = OrganizationActionTypes.OrganizationsServicePack;
    constructor(readonly payload: any) {}
}

export class OrganizationsServicePackSuccess implements Action {
    readonly type = OrganizationActionTypes.OrganizationsServicePackSuccess;
    constructor(readonly payload: {data: any}) {}
}

export class OrganizationsServicePackFaild  implements Action {
    readonly type = OrganizationActionTypes.OrganizationsServicePackFaild;
    constructor(readonly payload: {err: any}) {}
}

export type OrganizationActions = LoadOrganizations
    | LoadOrganizationsSuccess
    | LoadOrganizationsFaild
    | OrganizationsUpdate
    | OrganizationsUpdateSuccess
    | OrganizationsUpdateFaild
    | OrganizationsDelete
    | OrganizationsUploadFile
    | OrganizationsUploadFileSuccess
    | OrganizationsUploadFileFaild
    | LoadInforOrganizations
    | LoadInforOrganizationsSuccess
    | LoadInforOrganizationsErr
    | LoadAllCategory
    | LoadAllCategorySuccess
    | LoadAllCategoryFaild
    | UploadFileOrganizations
    | UploadFileOrganizationsSuccess
    | UploadFileOrganizationsFaild
    | GetLinkImage
    | GetLinkImageSuccess
    | GetLinkImageFaild
    | OrganizationsInforUpdate
    | OrganizationsInforUpdateSuccess
    | OrganizationsInforUpdateFaild
    | OrganizationsServicePack
    | OrganizationsServicePackSuccess
    | OrganizationsServicePackFaild
    | OrganizationsCreate;
