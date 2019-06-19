import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user/user.service';
import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import {
  UserActionTypes,
  LoadUsers,
  LoadUserSuccess,
  LoadUserFaild,
  LoadUserById,
  LoadUserByIdSuccess,
  LoadUserByIdFaild,
  UserCreate,
  UserUpdate,
  UserDelete,
  UserUpdateSuccess,
  UserUpdateFaild,
  UserPagination,
  UserCreateSuccess,
  UserCreateFaild,
  ListUserByAuthorityId,
  ListUserByAuthorityIdSuccess, ResetPasswordUser, ResetPasswordUserSuccess, ResetPasswordUserFaild,
  UserAuthorityPack,
  UserAuthorityPackSuccess,
  UserAuthorityPackFaild,
  UserAuthorityPackById,
  UserAuthorityPackByIdSuccess,
  UserAuthorityPackBuIdFaild,
  UserServicePack,
  UserServicePackSuccess,
  UserServicePackFaild,
  UserDeleteSuccess,
  UserDeleteFaild
} from '../actions/user.actions';

import { of } from 'rxjs';
import { exhaustMap, mergeMap } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from '../../../../../shared/constants/pagination.constants';
import { Store } from "@ngrx/store";
import { State } from "../../../admin.state";
import { catchError, map, withLatestFrom } from 'rxjs/internal/operators';
import {
  ActionChangePasswordUserFaild,
  ActionChangePasswordUserSuccess,
  AuthActionTypes
} from "../../../../../core/auth/auth.actions";


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private service$: UserService,
    public store: Store<State>
  ) { }

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    exhaustMap((action: LoadUsers) =>
      this.service$.fetch(action.payload.pagination).pipe(
        map(data => new LoadUserSuccess({ data: data, pagination: action.payload.pagination })),
        catchError(err => of(new LoadUserFaild({ err })))
      )
    )
  );

  // get user by id
  @Effect()
  loadUsersById$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserById),
    exhaustMap((action: LoadUserById) =>
      this.service$.getUserById(action.payload.id).pipe(
        map(data => new LoadUserByIdSuccess({ data: data })),
        catchError(err => of(new LoadUserByIdFaild({ err })))
      )
    )
  );


  //sua user
  @Effect()
  updateUser$ = () =>
    this.actions$.pipe(
      ofType<UserUpdate>(UserActionTypes.UserUpdate),
      exhaustMap((action: UserUpdate) =>
        this.service$.updateUser(action.payload.user).pipe(
          withLatestFrom(this.store.select(state => {
            return state.admin.userState.param;
          })),
          map(([res, param]) => new UserUpdateSuccess({ res, param })),
          catchError(err => of(new UserUpdateFaild({ err })))
        )
      )
    );

  // add user
  @Effect()
  addUser$ = () =>
    this.actions$.pipe(
      ofType<UserCreate>(UserActionTypes.UserCreate),
      exhaustMap((action: UserCreate) =>
        this.service$.addUser(action.payload.user).pipe(
          withLatestFrom(this.store.select(state => {
            return state.admin.userState.param;
          })),
          map(([res, param]) => new UserCreateSuccess({ res, param: { ...param, CurrPage: 1 } })),
          catchError(err => of(new UserCreateFaild({ err })))
        )
      )
    );

  // Xoa user
  @Effect()
  deleteUser$ = () =>
    this.actions$.pipe(
      ofType<UserDelete>(UserActionTypes.UserDelete),
      exhaustMap((action: UserDelete) =>
        this.service$.deleteUser(action.payload.userId).pipe(
          withLatestFrom(this.store.select(state => {
            return state.admin.userState.param;
          })),
          map(([res, param]) => new UserDeleteSuccess({ res, param })),
          catchError(err => of(new UserDeleteFaild({ err })))
        )
      )
    );


  @Effect()
  listUserByAuthorityId$ = () => {
    return this.actions$.pipe(
      ofType(UserActionTypes.ListUserByAuthorityId),
      exhaustMap((action: ListUserByAuthorityId) =>
        this.service$.listUserByAuthorityId(action.payload.authorityId).pipe(
          map(data => {
            return new ListUserByAuthorityIdSuccess({ data: data })
          }),
          catchError(err => of(1))
        )
      )
    )
  }

  @Effect()
  resetPasswordUser = () =>
    this.actions$.pipe(
      ofType<ResetPasswordUser>(UserActionTypes.ResetPasswordUser),
      exhaustMap((action: ResetPasswordUser) =>
        this.service$.resetPasswordUser(action.payload.account).pipe(
          map((data) => {
            return new ResetPasswordUserSuccess({ reset: data });
          }),
          catchError(err => of(new ResetPasswordUserFaild({ err })))
        )
      )
    );

  @Effect()
  getAuthorityPack$ = this.actions$.pipe(
    ofType(UserActionTypes.UserAuthorityPack),
    exhaustMap((action: UserAuthorityPack) =>
      this.service$.getUserAuthorityPack(action.payload).pipe(
        map(data => {
          return new UserAuthorityPackSuccess({ data: data });
        }),
        catchError(err => of(new UserAuthorityPackFaild({ err })))
      )
    )
  );

  @Effect()
  getAuthorityPackById$ = this.actions$.pipe(
    ofType(UserActionTypes.UserAuthorityPackById),
    exhaustMap((action: UserAuthorityPackById) =>
      this.service$.getUserAuthorityPackById(action.payload.userId).pipe(
        map(data => {
          return new UserAuthorityPackByIdSuccess(data.data);
        }),
        catchError(err => of(new UserAuthorityPackBuIdFaild({ err })))
      )
    )
  );

  @Effect()
  getServicePack$ = this.actions$.pipe(
    ofType(UserActionTypes.UserServicePack),
    exhaustMap((action: UserServicePack) =>
      this.service$.getUserServicePack(action.payload.userId).pipe(
        map(data => {
          return new UserServicePackSuccess({ data: data });
        }),
        catchError(err => of(new UserServicePackFaild({ err })))
      )
    )
  );

}
