import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { ICredentials } from 'src/app/shared/model/credentials.model';
import { IUser } from 'src/app/shared/model/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGOUT = '[Auth] Logout',
  EXPIRED = '[Auth] Expired',
  AUTHENTICATE = '[Login] Authenticate',
  AUTHENTICATE_SUCCESS = '[Login] Authenticate Success',
  AUTHENTICATE_ERROR = '[Login] Authenticate Error',
  FETCH_ACCOUNT = '[Account] Fetch',
  FETCH_ACCOUNT_SUCCESS = '[Account] Fetch Success',
  FETCH_ACCOUNT_ERROR = '[Account] Fetch Error',
  FETCH_ACCOUNT_MENU = '[Menu] Fetch',
  FETCH_ACCOUNT_MENU_SUCCESS = '[Menu] Fetch Success',
  FETCH_ACCOUNT_MENU_ERROR = '[Menu] Fetch Error',
  FETCH_PERMISSION = '[Permission] Fetch',
  FETCH_PERMISSION_SUCCESS = '[Permission] Fetch Success',
  FETCH_PERMISSION_ERROR = '[Permission] Fetch Error',
  TAB_ADD_OR_ACTIVE = '[Tab] Add or active tab',
  TAB_REMOVE = '[Tab] remove tab',
  TAB_ACTIVE = '[Tab] Active tab',
  TAB_DESTROY_ARGS = '[Tab] Destroy tab args',
  CHANGE = '[Login] Change',
  CHANGE_PASSWORD = '[Login] Change Password',
  CHANGE_PASSWORD_SUCCESS = '[Login] Change Password Success',
  CHANGE_PASSWORD_FAILD = '[Login] Change Password Faild',
  LOAD_AUTHENTICATE = '[Login] Load Authenticate',
  CHANGE_PASSWORD_USER = '[Login] Change Password user',
  CHANGE_PASSWORD_USER_SUCCESS = '[Login] Change Password user Success',
  CHANGE_PASSWORD_USER_FAILD = '[Login] Change Password user Faild',
  CHECK_TOKEN_RESET = '[Login] Check token reset',
  CHECK_TOKEN_RESET_SUCCESS = '[Login] Check token reset success',
  CHECK_TOKEN_RESET_FAILD = '[Login] Check token reset Faild',
  RESET_PASSWORD_FINISH = '[Login] Reset password finish',
  RESET_PASSWORD_FINISH_SUCCESS = '[Login] Reset password finish success',
  RESET_PASSWORD_FINISH_FAILD = '[Login] Reset password finish faild',
  NAVIGATE_LOGIN = '[Login] Navigate login',
  FETCH_ACOUNT_PERMISSON = '[Permission] Fetch account permission',
  FETCH_ACOUNT_PERMISSON_SUCCESS = '[Permisson] Fetch account permission success',
  FETCH_ACOUNT_PERMISSON_ERROR = '[Permisson] Fetch account permission error',
  UPDATEACCOUNTAVATAR = '[Account] Update account avatar',
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthExpired implements Action {
  readonly type = AuthActionTypes.EXPIRED;
}

export class ActionAuthenticate implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;
  constructor(readonly payload: { credentials: ICredentials }) { }
}

export class ActionAuthenticateSuccess implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;

  constructor(readonly payload: { token: string }) { }
}

export class ActionAuthenticateError implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionFetchAccount implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT;
}

export class ActionFetchAccountSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_SUCCESS;
  constructor(readonly payload: { account: IUser }) { }
}

export class ActionFetchAccountError implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionFetchAccountMenu implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU;
}

export class ActionFetchAccountMenuSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS;
  constructor(readonly payload: { menu: MainMenuItems[] }) { }
}

export class ActionFetchAccountMenuError implements Action {
  readonly type = AuthActionTypes.FETCH_ACCOUNT_MENU_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionFetchPermission implements Action {
  readonly type = AuthActionTypes.FETCH_PERMISSION;
}

export class ActionFetchPermissionSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_PERMISSION_SUCCESS;
  constructor(readonly payload: { permissions: any }) { }
}

export class ActionFetchPermissionError implements Action {
  readonly type = AuthActionTypes.FETCH_PERMISSION_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
}

export class ActionAddOrActiveTab implements Action {
  readonly type = AuthActionTypes.TAB_ADD_OR_ACTIVE;
  constructor(readonly payload: { tab: { code: string; type?: string }; args?: any }) { }
}

export class ActionRemoveTab implements Action {
  readonly type = AuthActionTypes.TAB_REMOVE;
  constructor(readonly payload: { code: string; type?: string }) { }
}

export class ActionActiveTab implements Action {
  readonly type = AuthActionTypes.TAB_ACTIVE;
  constructor(readonly payload: string) { }
}

export class ActionDestroyTabArgs implements Action {
  readonly type = AuthActionTypes.TAB_DESTROY_ARGS;
  constructor(readonly payload: { args: any }) { }
}

export class ActionChange implements Action {
  readonly type = AuthActionTypes.CHANGE;
  constructor(readonly payload: any) { }
}

export class ActionChangePassword implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD;
  constructor(readonly payload: any) { }
}

export class ActionChangePasswordSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_SUCCESS;
  constructor(readonly payload: { change: boolean }) { }
}

export class ActionChangePasswordFaild implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_FAILD;
  constructor(readonly payload: { err: any }) { }
}

export class ActionLoadAuthenticate implements Action {
  readonly type = AuthActionTypes.LOAD_AUTHENTICATE;
  constructor(readonly payload: string) { }
}

export class ActionChangePasswordUser implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_USER;
  constructor(readonly payload: any) { }
}

export class ActionChangePasswordUserSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_USER_SUCCESS;
  constructor(readonly payload: { change: any }) { }
}

export class ActionChangePasswordUserFaild implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_USER_FAILD;
  constructor(readonly payload: { err: any }) { }
}

export class ActionChecktokenReset implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN_RESET;
  constructor(readonly payload: any) { }
}

export class ActionChecktokenResetSuccess implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN_RESET_SUCCESS;
  constructor(readonly payload: { data: any }) { }
}

export class ActionChecktokenResetFaild implements Action {
  readonly type = AuthActionTypes.CHECK_TOKEN_RESET_FAILD;
  constructor(readonly payload: { err: any }) { }
}

export class ActionResetPasswordFinish implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FINISH;
  constructor(readonly payload: any) { }
}

export class ActionResetPasswordFinishSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FINISH_SUCCESS;
  constructor(readonly payload: { change: boolean }) { }
}

export class ActionResetPasswordFinishFaild implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FINISH_FAILD;
  constructor(readonly payload: { err: any }) { }
}

export class ActionNavigateLogin implements Action {
  readonly type = AuthActionTypes.NAVIGATE_LOGIN;
}

export class ActionFetchAccountPermission implements Action {
  readonly type = AuthActionTypes.FETCH_ACOUNT_PERMISSON;
}

export class ActionFetchAccountPermissionSuccess implements Action {
  readonly type = AuthActionTypes.FETCH_ACOUNT_PERMISSON_SUCCESS;
  constructor(readonly payload: { permissions: any }) { }
}

export class ActionFetchAccountPermissionError implements Action {
  readonly type = AuthActionTypes.FETCH_ACOUNT_PERMISSON_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class UpdateAccountAvarta implements Action {
    readonly type = AuthActionTypes.UPDATEACCOUNTAVATAR;

    constructor(readonly payload: { avatar: any }) { }
}

export type AuthActions =
  | ActionAuthLogin
  | ActionAuthLogout
  | ActionAuthenticate
  | ActionAuthenticateSuccess
  | ActionAuthenticateError
  | ActionFetchAccount
  | ActionFetchAccountSuccess
  | ActionFetchAccountError
  | ActionFetchAccountMenu
  | ActionFetchAccountMenuSuccess
  | ActionFetchAccountMenuError
  | ActionFetchPermission
  | ActionFetchPermissionSuccess
  | ActionFetchPermissionError
  | ActionLoginSuccess
  | ActionAddOrActiveTab
  | ActionRemoveTab
  | ActionActiveTab
  | ActionDestroyTabArgs
  | ActionChange
  | ActionChangePassword
  | ActionChangePasswordSuccess
  | ActionChangePasswordFaild
  | ActionLoadAuthenticate
  | ActionChangePasswordUser
  | ActionChangePasswordUserSuccess
  | ActionChangePasswordUserFaild
  | ActionChecktokenReset
  | ActionChecktokenResetSuccess
  | ActionChecktokenResetFaild
  | ActionResetPasswordFinish
  | ActionResetPasswordFinishSuccess
  | ActionResetPasswordFinishFaild
  | ActionNavigateLogin
  | ActionFetchAccountPermission
  | ActionFetchAccountPermissionSuccess
  | ActionFetchAccountPermissionError
  | ActionAuthExpired
  | UpdateAccountAvarta;
