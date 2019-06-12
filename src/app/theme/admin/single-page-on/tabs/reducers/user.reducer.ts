import { Action } from '@ngrx/store';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { Pagination } from '../../../../../shared/model/pagination.model';
import { IUser } from 'src/app/shared/model/user.model';

export interface UserState {
  users?: IUser[];
  selectUsers?: IUser[];
  pagination?: Pagination;
  load?: boolean;
  err?: any;
  listUserByAuthority?: IUser[],
  reset?: any
  resetErr?: any;
  param?: any;
  authorityPack?: any;
  authorityPackById?: any;
  servicePack?: any;
}

export const initialState: UserState = {

};

export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.LoadUsers:
      return {
        ...state,
        param: action.payload.pagination
      };

    case UserActionTypes.LoadUserSuccess:
      return {
        ...state,
        users: action.payload.data,
      };

    case UserActionTypes.LoadUserFaild:
      return {
        ...state,
        err: action.payload.err
      };

    case UserActionTypes.LoadUserById:
      return {
        ...state,
      };

    case UserActionTypes.LoadUserByIdSuccess:
      return {
        ...state,
        selectUsers: action.payload.data
      };

    case UserActionTypes.LoadUserByIdFaild:
      return {
        ...state,
        err: action.payload.err
      };

    case UserActionTypes.UserCreate:
      return {
        ...state,
        load: false,
        err: null
      };

    case UserActionTypes.UserCreateSuccess:
      return {
        ...state,
        load: action.payload.data,
        err: null
      };

    case UserActionTypes.UserCreateFaild:
      return {
        ...state,
        err: action.payload.err
      };

    case UserActionTypes.UserUpdate:
      return {
        ...state,
        load: false,
        err: null
      };

    case UserActionTypes.UserUpdateSuccess:
      return {
        ...state,
        load: action.payload.data,
        err: null
      };

    case UserActionTypes.UserUpdateFaild:
      return {
        ...state,
        err: action.payload.err
      };

    case UserActionTypes.ListUserByAuthorityId:
      return {
        ...state
      }

    case UserActionTypes.ListUserByAuthorityIdSuccess:
      return {
        ...state,
        listUserByAuthority: action.payload.data,

      }

    case UserActionTypes.ResetPasswordUser:
      console.log('vao dya');
      return {
        ...state,
        reset: null,
        resetErr: null
      };
    case UserActionTypes.ResetPasswordUserSuccess:
      return {
        ...state,
        reset: action.payload.reset,
        resetErr: null
      };
    case UserActionTypes.ResetPasswordUserFaild:
      return {
        ...state,
        reset: null,
        resetErr: action.payload.err
      };

    case UserActionTypes.UserAuthorityPackSuccess:
      return {
        ...state,
        authorityPack: action.payload.data
      };

      // nhóm quyền theo id
    case UserActionTypes.UserAuthorityPackById:
      return {
        ...state,
      };

    case UserActionTypes.UserAuthorityPackByIdSuccess:
    // console.log('action.payload.data1111', action.payload);
      return {
        ...state,
        authorityPackById: action.payload.data,

      };

    case UserActionTypes.UserAuthorityPackByIdFaild:
      return {
        ...state,
        err: action.payload.err
      };

      // sddfsd
      case UserActionTypes.UserServicePackSuccess:
      return {
          ...state,
          servicePack: action.payload.data
      };

      case UserActionTypes.UserClearError:
        return  {
          ...state,
          err: undefined
        }

    default:
      return state;
  }
}
