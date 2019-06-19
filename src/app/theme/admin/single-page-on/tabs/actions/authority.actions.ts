import { Action } from '@ngrx/store';
import { Authority } from '../../../../../shared/model/authority.model';
import { Role } from 'src/app/shared/model/role.model';

export enum AuthorityActionTypes {
    LoadAuthorities = '[Authority] Load Authorities',
    LoadAuthoritySuccess = '[Authority] Load Authorities success',
    LoadAuthorityFail = '[Authority] Add Authorities fail',
    AddAuthority = '[Authority] Add Authorities',
    AddAuthoritySuccess = '[Authority] Add Authorities success',
    
    AddAuthorityFail = '[Authority] Add Authorities fail',
    LoadListAuthorityFilter = '[Authority] Load List Authority Filter',
    DeleteAuthority = '[Authority] Delete Authority Item',
    DeleteAuthoritySuccess = '[Authority] Delete Authority Success',
    DeleteAuthorityFail = '[Authority] Delete Authority Fail',
    UpdateAuthority = '[Authority] update Authority',
    UpdateAuthoritySuccess = '[Authority] update Authority Success',
    LoadAllRole = '[Authority] List all roles',
    LoadAllRoleSuccess = '[Authoity] Load all role success',
    LoadAllRoleFail = '[Authority] Load all role fail',
    LoadAllAuthority = '[Authority] Load All Authority',
    LoadAllAuthoritySuccess = '[Authority] Load All Authority Success',
    LoadAllAuthorityFail = '[Authority] Load All Authority Fail',
    CopyAuthority = '[Authority] copy authority',
    CopyAuthoritySuccess = '[Authority] copy authority success',
    CopyAuthorityFail = '[Authority] copy authority fail',
    AuthorityInfo = '[Authority] authority information',
    AuthorityUserEdit = '[Authority] authority user update',
    AuthorityUserEditSuccess = '[Authority] authority user update success',
    AuthorityUserEditFail = '[Authority] authority user update fail',
    AuthorityInfoSuccess = '[Authority] authority information success',
    AuthorityInfoFaild = '[Authority] authority information faild',
    
}

export class LoadAuthorities implements Action {
  readonly type = AuthorityActionTypes.LoadAuthorities;
  constructor(readonly payload: { textSearch: String, currPage: Number, recordperpage: Number }) {}
}

export class LoadAuthoritySuccess implements Action {
    readonly type = AuthorityActionTypes.LoadAuthoritySuccess;
    constructor(readonly payload: { data: any, paging: any }) {}
}

export class LoadAuthorityFail implements Action {
  readonly type = AuthorityActionTypes.LoadAuthorityFail;
  constructor(readonly payload: { err: any }) {}
}

export class AddAuthority implements Action {
  readonly type = AuthorityActionTypes.AddAuthority;
  constructor(readonly payload: { tblAuthority: Authority, tblRoles: any }) {}
}

export class AddAuthorityFail implements Action {
  readonly type = AuthorityActionTypes.AddAuthorityFail;
  constructor(readonly payload: { err: any }) {};
}

export class UpdateAuthority implements Action {
  readonly type = AuthorityActionTypes.UpdateAuthority;
  constructor(readonly payload: { tblAuthority: Authority, tblRoles: any }) {}
}

export class UpdateAuthoritySuccess implements Action {
  readonly type = AuthorityActionTypes.UpdateAuthoritySuccess;
  constructor(readonly payload: { authority: Authority }) {}
}
export class AddAuthoritySuccess implements Action {
  readonly type = AuthorityActionTypes.AddAuthoritySuccess;
  constructor(readonly payload: { authority: Authority }) {}
}

export class LoadListAuthorityFilter implements Action {
  readonly type = AuthorityActionTypes.LoadListAuthorityFilter;
  constructor(readonly payload: { filter: any }) { }
}

export class DeleteAuthority implements Action {
  readonly type = AuthorityActionTypes.DeleteAuthority;
  constructor(readonly payload: { authority: Authority }) { }
}

export class DeleteAuthoritySuccess implements Action {
  readonly type = AuthorityActionTypes.DeleteAuthoritySuccess;
  constructor(readonly payload: { authority: Authority }) { }
}

export class DeleteAuthorityFail implements Action {
  readonly type = AuthorityActionTypes.DeleteAuthorityFail;
  constructor(readonly payload: { err: any }) { }
}

export class LoadAllAuthority implements Action {
  readonly type = AuthorityActionTypes.LoadAllAuthority;
  constructor(readonly payload: { textSearch: String, currPage: Number, recordperpage: Number }) {}
}

export class LoadAllAuthoritySuccess implements Action {
    readonly type = AuthorityActionTypes.LoadAllAuthoritySuccess;
    constructor(readonly payload: { data: any, paging: any }) {}
}

export class LoadAllAuthorityFail implements Action {
  readonly type = AuthorityActionTypes.LoadAllAuthorityFail;
  constructor(readonly payload: { err: any }) {}
}
export class LoadAllRole implements Action {
  readonly type = AuthorityActionTypes.LoadAllRole;
  constructor(readonly payload: { ParentCode: String }) {}
}

export class LoadAllRoleSuccess implements Action {
  readonly type = AuthorityActionTypes.LoadAllRoleSuccess;
  constructor(readonly payload: { data: Role[] }) {}
}

export class LoadAllRoleFail implements Action {
  readonly type = AuthorityActionTypes.LoadAllRoleFail;
  constructor(readonly payload: { err: any }) {}
}

export class CopyAuthority implements Action {
  readonly type = AuthorityActionTypes.CopyAuthority
  constructor(readonly payload: { id: Number, parentCode: String }) {};
}

export class CopyAuthoritySuccess implements Action {
  readonly type = AuthorityActionTypes.CopyAuthoritySuccess
  constructor(readonly payload: { data: any }) {};
}

export class CopyAuthorityFail implements Action {
  readonly type = AuthorityActionTypes.CopyAuthorityFail;
  constructor(readonly payload: { err: any }) {};
}

export class AuthorityUserEdit implements Action {
  readonly type = AuthorityActionTypes.AuthorityUserEdit;
  constructor(readonly payload: { authorityId: Number, users: any}) {};

}

export class AuthorityUserEditSuccess implements Action {
  readonly type = AuthorityActionTypes.AuthorityUserEditSuccess;
}
export class AuthorityUserEditFail implements Action {
  readonly type = AuthorityActionTypes.AuthorityUserEditFail;
  constructor(readonly payload: { err }) {};
}
export class AuthorityInfo implements Action {
    readonly type = AuthorityActionTypes.AuthorityInfo;
}

export class AuthorityInfoSuccess implements Action {
    readonly type = AuthorityActionTypes.AuthorityInfoSuccess;
    constructor(readonly payload: {data: any}) {}
}

export class AuthorityInfoFaild implements Action {
    readonly type = AuthorityActionTypes.AuthorityInfoFaild;
    constructor(readonly payload: {err: any}) {}
}

export type AuthorityActions = LoadAuthorities
| LoadAuthoritySuccess 
| AddAuthority 
| AddAuthoritySuccess 
| AddAuthorityFail
| LoadListAuthorityFilter 
| DeleteAuthority
| DeleteAuthoritySuccess
| DeleteAuthorityFail
| UpdateAuthority
| UpdateAuthoritySuccess
| LoadAllRole
| LoadAllRoleSuccess
| LoadAllRoleFail
| LoadAllAuthority
| LoadAllAuthoritySuccess
| LoadAllAuthorityFail
| CopyAuthority
| CopyAuthoritySuccess
| CopyAuthorityFail
| AuthorityUserEdit
| AuthorityUserEditSuccess
| AuthorityUserEditFail
| AuthorityInfo
| AuthorityInfoSuccess
| AuthorityInfoFaild;
