import { Action } from '@ngrx/store';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { User } from '../../../../../shared/model/user.model';
import { AuthActionTypes } from "../../../../../core/auth/auth.actions";

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUserSuccess = '[User] Load User success',
  LoadUserFaild = '[User] Load User Faild',
  UserCreate = '[User] User Create',
  UserCreateSuccess = '[User] User Create Success',
  UserCreateFaild = '[User] User Create Faild',
  UserUpdate = '[User] User Update',
  UserDelete = '[User] User Delete',
  UserUpdateSuccess = '[User] User Update Success',
  UserUpdateFaild = '[User] User Update Faild',
  UserPagination = '[user] User pagination',
  ListUserByAuthorityId = '[User] List User by authority Id',
  ListUserByAuthorityIdSuccess = '[User] List User by authority success',
  LoadUserById = '[User] User By ID',
  LoadUserByIdSuccess = '[User] User By Id success',
  LoadUserByIdFaild = '[User] User By Id Faild',
  ResetPasswordUser = '[User] Reset password user',
  ResetPasswordUserSuccess = '[User] Reset password user success',
  ResetPasswordUserFaild = '[User] Reset password user Faild',

  LoadGetUser = '[User] Load Get User',
  LoadGetUserSuccess = '[User] Load Get User Success',
  LoadGetUserFaild = '[User] Load Get User Faild',

  UserAuthorityPack = '[User] User Authority Pack',
  UserAuthorityPackSuccess = '[User] User Authority Pack Success',
  UserAuthorityPackFaild = '[User] User Authority Pack Faild',

  UserAuthorityPackById = '[User] User Authority Pack By Id ',
  UserAuthorityPackByIdSuccess = '[User] User Authority Pack By Id Success',
  UserAuthorityPackByIdFaild = '[User] User Authority Pack By Id Faild',

  UserServicePack = '[User] User service pack',
  UserServicePackSuccess = '[User] User service pack success',
  UserServicePackFaild = '[User] User service pack faild',
  UserClearError = '[User] Clear Error'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
  constructor(readonly payload: { pagination: Pagination }) { }
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LoadUserSuccess;
  constructor(readonly payload: { data: any, pagination: Pagination }) { }
}

export class LoadUserFaild implements Action {
  readonly type = UserActionTypes.LoadUserFaild;
  constructor(readonly payload: { err: any }) { }
}

export class LoadUserById implements Action {
  readonly type = UserActionTypes.LoadUserById;
  constructor(readonly payload: { id: number }) { }
}

export class LoadUserByIdSuccess implements Action {
  readonly type = UserActionTypes.LoadUserByIdSuccess;
  constructor(readonly payload: { data: any }) { }
}

export class LoadUserByIdFaild implements Action {
  readonly type = UserActionTypes.LoadUserByIdFaild;
  constructor(readonly payload: { err: any }) { }
}

export class UserCreate implements Action {
  readonly type = UserActionTypes.UserCreate;
  constructor(readonly payload: { user: any }) { }
}

export class UserCreateSuccess implements Action {
  readonly type = UserActionTypes.UserCreateSuccess;
  constructor(readonly payload: { data: boolean }) { }
}

export class UserCreateFaild implements Action {
  readonly type = UserActionTypes.UserCreateFaild;
  constructor(readonly payload: { err: any }) { }
}

export class UserUpdate implements Action {
  readonly type = UserActionTypes.UserUpdate;
  constructor(readonly payload: { user: any }) { }
}

export class UserDelete implements Action {
  readonly type = UserActionTypes.UserDelete;
  constructor(readonly payload: { userId: number }) { }
}

export class UserUpdateSuccess implements Action {
  readonly type = UserActionTypes.UserUpdateSuccess;
  constructor(readonly payload: { data: boolean }) { }
}

export class UserUpdateFaild implements Action {
  readonly type = UserActionTypes.UserUpdateFaild;
  constructor(readonly payload: { err: any }) { }
}

export class UserPagination implements Action {
  readonly type = UserActionTypes.UserPagination;
  constructor(readonly payload: { page: number }) { }
}

export class ListUserByAuthorityId implements Action {
  readonly type = UserActionTypes.ListUserByAuthorityId;
  constructor(readonly payload: { authorityId: number }) { }
}

export class ListUserByAuthorityIdSuccess implements Action {
  readonly type = UserActionTypes.ListUserByAuthorityIdSuccess;
  constructor(readonly payload: { data: any }) { };
}

export class ResetPasswordUser implements Action {
  readonly type = UserActionTypes.ResetPasswordUser;
  constructor(readonly payload: { account: any }) { }
}

export class ResetPasswordUserSuccess implements Action {
  readonly type = UserActionTypes.ResetPasswordUserSuccess;
  constructor(readonly payload: { reset: any }) { }
}

export class ResetPasswordUserFaild implements Action {
  readonly type = UserActionTypes.ResetPasswordUserFaild;
  constructor(readonly payload: { err: any }) { }
}

export class UserAuthorityPack implements Action {
  readonly type = UserActionTypes.UserAuthorityPack;
  constructor(readonly payload: any) { }
}

export class UserAuthorityPackSuccess implements Action {
  readonly type = UserActionTypes.UserAuthorityPackSuccess;
  constructor(readonly payload: { data: any }) { }
}

export class UserAuthorityPackFaild implements Action {
  readonly type = UserActionTypes.UserAuthorityPackFaild;
  constructor(readonly payload: { err: any }) { }
}

// UserAuthorityPack by id
export class UserAuthorityPackById implements Action {
  readonly type = UserActionTypes.UserAuthorityPackById;
  constructor(readonly payload: { userId: any }) { }
}

export class UserAuthorityPackByIdSuccess implements Action {
  readonly type = UserActionTypes.UserAuthorityPackByIdSuccess;
  constructor(readonly payload: { data: any }) { }
}

export class UserAuthorityPackBuIdFaild implements Action {
  readonly type = UserActionTypes.UserAuthorityPackByIdFaild;
  constructor(readonly payload: { err: any }) { }
}

export class UserClearError implements Action {
  readonly type = UserActionTypes.UserClearError;
}

export class UserServicePack implements Action {
  readonly type = UserActionTypes.UserServicePack;
  constructor(readonly payload: { userId: any }) {}
}

export class UserServicePackSuccess implements Action {
  readonly type = UserActionTypes.UserServicePackSuccess;
  constructor(readonly payload: {data: any}) {}
}

export class UserServicePackFaild  implements Action {
  readonly type = UserActionTypes.UserServicePackFaild;
  constructor(readonly payload: {err: any}) {}
}


export type UserActions = LoadUsers
  | LoadUserById
  | LoadUserSuccess
  | LoadUserFaild
  | LoadUserByIdFaild
  | LoadUserByIdSuccess
  | UserCreate
  | UserCreateSuccess
  | UserCreateFaild
  | UserUpdate
  | UserDelete
  | UserUpdateSuccess
  | UserUpdateFaild
  | UserPagination
  | ListUserByAuthorityId
  | ListUserByAuthorityIdSuccess
  | ResetPasswordUser
  | ResetPasswordUserSuccess
  | ResetPasswordUserFaild
  | UserAuthorityPack
  | UserAuthorityPackSuccess
  | UserAuthorityPackFaild
  | UserAuthorityPackById
  | UserAuthorityPackByIdSuccess
  | UserAuthorityPackBuIdFaild
  | UserServicePack
  | UserServicePackSuccess
  | UserServicePackFaild
  | UserClearError
  ;
