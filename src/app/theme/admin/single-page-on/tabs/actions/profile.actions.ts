import { Action } from '@ngrx/store';
import {IUser} from "../../../../../shared/model/user.model";

export enum ProfileActionTypes {
  ProfilesUpdate = '[Profile] Profiles Update',
  ProfilesUpdateSuccess = '[Profile] Profiles Success',
  ProfilesUpdateFaild = '[Profile] Profiles Faild',
  UploadFileProfiles = '[Profile] Upload File Profiles',
  UploadFileProfilesSuccess = '[Profile] Upload File Profiles Success',
  UploadFileProfilesFaild = '[Profile] Upload File Profiles Faild',
GetImageProfiles = '[Profile] get image profiles'
}

export class ProfilesUpdate implements Action {
  readonly type = ProfileActionTypes.ProfilesUpdate;
  constructor (readonly  payload: {account: IUser}) {}
}
export class ProfilesUpdateSuccess implements Action {
    readonly type = ProfileActionTypes.ProfilesUpdateSuccess;
    constructor (readonly  payload: {load: any}) {}
}export class ProfilesUpdateFaild implements Action {
    readonly type = ProfileActionTypes.ProfilesUpdateFaild;
    constructor (readonly  payload: {err: any}) {}
}

export class UploadFileProfiles implements Action {
    readonly type = ProfileActionTypes.UploadFileProfiles;
    constructor (readonly payload: {file: any}) {}
}
export class UploadFileProfilesSuccess implements Action {
    readonly type = ProfileActionTypes.UploadFileProfilesSuccess;
    constructor (readonly payload: {load: boolean}) {}
}
export class UploadFileProfilesFaild implements Action {
    readonly type = ProfileActionTypes.UploadFileProfilesFaild;
    constructor (readonly payload: {err: any}) {}
}

export class GetImageProfiles implements Action {
    readonly type = ProfileActionTypes.GetImageProfiles;
    constructor (readonly payload: {link: any}) {}
}

export type ProfileActions = ProfilesUpdate
    | ProfilesUpdateSuccess
    | ProfilesUpdateFaild
    | UploadFileProfiles
    | UploadFileProfilesSuccess
    | UploadFileProfilesFaild
    | GetImageProfiles;
