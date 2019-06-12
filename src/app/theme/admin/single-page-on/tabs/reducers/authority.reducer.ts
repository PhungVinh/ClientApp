import { Action } from '@ngrx/store';
import { AuthorityActions, AuthorityActionTypes } from '../actions/authority.actions';
import { Authority } from '../../../../../shared/model/authority.model';
import { Role } from 'src/app/shared/model/role.model';
import { AuthActionTypes } from 'src/app/core/auth/auth.actions';


export interface AuthorityState {
    authorities?: Authority [];
    allAuthority?: Authority [];
    reqOption: RequestOptions;
    loading?: boolean;
    err?: any;
    roles?: Role [];
    isShowAll?: boolean;
    isEditAll?: boolean;
    isDeleteAll?: boolean;
    isShow?: boolean;
    isAdd?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    checkAll?: boolean;
    authorityInfo?: any;
}

export interface RequestOptions {
    query?: {
        textSearch?: string;
    }
    sort?: string;
    currPage?: number;
    pageSize?: number;
    totalPage?: number;
  }

export const initialState: AuthorityState = {
    authorities: [],
    allAuthority: [],
    reqOption: {
        query: {
            textSearch: ''
        },
        currPage: 1,
        pageSize: 15
    },
    loading: false,
    err: false,
    roles: [],
    isShowAll: false,
    isEditAll: false,
    isDeleteAll: false,
    isShow: false,
    isAdd: false,
    isEdit: false,
    isDelete: false,
    checkAll: false
};

export function authorityReducer(state = initialState, action: AuthorityActions): AuthorityState {
    const oldRequestOptions = state.reqOption;
    let newRequestOption = {};
    switch (action.type) {
        case AuthorityActionTypes.LoadAuthorities:
            return {
                ...state,
                loading: true
            };
        case AuthorityActionTypes.LoadAuthoritySuccess:
            return {
                ...state,
                authorities: action.payload.data,
                loading: false,
                reqOption: {
                    currPage: action.payload.paging[0].currPage,
                    pageSize: action.payload.paging[0].pageSize,
                    totalPage: action.payload.paging[0].totalPage
                }
            };

        case AuthorityActionTypes.LoadAuthorityFail:
            return {
                ...state,
                err: action.payload.err
            }

        case AuthorityActionTypes.AddAuthority:
        return {
            ...state,
            loading: true,
            err: null
        }

        case AuthorityActionTypes.AddAuthoritySuccess:
        return {
            ...state,
            authorities: [{ ...action.payload.authority }, ...state.authorities],
            loading: false,
            reqOption: {
                ...state.reqOption,
                currPage: 1,
                totalPage: state.reqOption.totalPage + 1
            },
            err: null
        }
        case AuthorityActionTypes.AddAuthorityFail:
        return {
            ...state,
            err: action.payload.err
        } 
        case AuthorityActionTypes.DeleteAuthority:
        return {
            ...state
        }
        case AuthorityActionTypes.DeleteAuthorityFail:
            return {
                ...state,
                err: action.payload.err
            }
        case AuthorityActionTypes.DeleteAuthoritySuccess:
        const authorities = state.authorities.filter(authority => authority.authorityId !== action.payload.authority.authorityId);
        return {
            ...state,
            authorities
        }
        case AuthorityActionTypes.UpdateAuthority:
        return {
            ...state,
            loading: true,
            err: null
        }
        case AuthorityActionTypes.UpdateAuthoritySuccess:
        const listAuthority = state.authorities.map(authority => authority.authorityId === action.payload.authority.authorityId ? { ...authority, ...action.payload.authority } : authority);
        return {
            ...state,
            authorities: listAuthority,
            loading: false,
            err: null
        }

        case AuthorityActionTypes.LoadListAuthorityFilter:
        newRequestOption = {
            ...oldRequestOptions,
            query: { ...action.payload.filter },
            page: 1
          };
          return {
            ...state,
            reqOption: newRequestOption
          };
        case AuthorityActionTypes.LoadAllAuthority:
            return {
                ...state,
                loading: true,
            };

        case AuthorityActionTypes.LoadAllAuthoritySuccess:
        return {
            ...state,
            allAuthority: action.payload.data,
            loading: false
        }

        case AuthorityActionTypes.LoadAllAuthorityFail:
            return {
                ...state,
                err: action.payload.err
            }
        case AuthorityActionTypes.LoadAllRole:
        return {
            ...state,
            loading: true
        }
        case AuthorityActionTypes.LoadAllRoleSuccess:
        return {
            ...state,
            roles: action.payload.data
        }

        case AuthorityActionTypes.CopyAuthority:
        return {
            ...state
        }

        case AuthorityActionTypes.CopyAuthoritySuccess:
        return {
            ...state,
            roles: action.payload.data,
            loading: true
        }

        case AuthorityActionTypes.CopyAuthorityFail:
            return {
                ...state,
                err: action.payload.err
            }

        case AuthorityActionTypes.AuthorityUserEditSuccess:
        return {
            ...state,
            loading: false
        }

        case AuthorityActionTypes.AuthorityUserEditFail:
        return {
            ...state,
            err: action.payload.err
        }
        case AuthorityActionTypes.AuthorityInfoSuccess:
            return {
                ...state,
                authorityInfo: action.payload.data
            };
        default:
          return state;
      }
}
