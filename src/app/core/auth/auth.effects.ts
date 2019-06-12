import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { asyncScheduler, of, Subject } from 'rxjs';
import { withLatestFrom } from "rxjs/internal/operators";
import { catchError, exhaustMap, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { AppState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ActionAddOrActiveTab, ActionAuthenticate, ActionAuthenticateError, ActionAuthenticateSuccess, ActionAuthExpired, ActionAuthLogin, ActionAuthLogout, ActionChange, ActionChangePassword, ActionChangePasswordFaild, ActionChangePasswordUser, ActionChangePasswordUserFaild, ActionChangePasswordUserSuccess, ActionChecktokenReset, ActionChecktokenResetFaild, ActionChecktokenResetSuccess, ActionFetchAccount, ActionFetchAccountError, ActionFetchAccountMenu, ActionFetchAccountMenuError, ActionFetchAccountMenuSuccess, ActionFetchAccountPermission, ActionFetchAccountPermissionError, ActionFetchAccountPermissionSuccess, ActionFetchAccountSuccess, ActionFetchPermission, ActionFetchPermissionError, ActionFetchPermissionSuccess, ActionLoadAuthenticate, ActionLoginSuccess, ActionNavigateLogin, ActionRemoveTab, ActionResetPasswordFinish, ActionResetPasswordFinishFaild, AuthActionTypes } from './auth.actions';
import { AUTH_ACCOUNT, AUTH_CHANGE, AUTH_KEY, AUTH_MENU, AUTH_PERMISSION, AUTH_TABS, AUTH_TOKEN } from './auth.constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private service: AuthService,
    public store: Store<AppState>
  ) { }

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
    })
  );

  // @Effect({ dispatch: false })
  // logout = this.actions$.pipe(
  //   ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
  //   tap(() => {
  //     this.router.navigate(['auth', 'login']);
  //     this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
  //     this.localStorageService.removeItem(AUTH_TOKEN);
  //     this.localStorageService.removeItem(AUTH_ACCOUNT);
  //     this.localStorageService.removeItem(AUTH_MENU);
  //     this.localStorageService.removeItem(AUTH_TABS);
  //   })
  // );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      const jwt = this.localStorageService.getItem(AUTH_TOKEN);
      this.router.navigate(['auth', 'login']);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
      this.localStorageService.removeItem(AUTH_TABS);
      this.localStorageService.removeItem(AUTH_PERMISSION);
      this.service.logout(jwt).subscribe();
    })
  );
  // @Effect({ dispatch: false })
  // logout = this.actions$.pipe(
  //   ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
  //   exhaustMap(() => this.service.logout().pipe(
  //     tap(() => {
  //       this.router.navigate(['auth', 'login']);
  //       this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
  //       this.localStorageService.removeItem(AUTH_TOKEN);
  //       this.localStorageService.removeItem(AUTH_ACCOUNT);
  //       this.localStorageService.removeItem(AUTH_MENU);
  //       this.localStorageService.removeItem(AUTH_TABS);
  //     })
  //   ))
  // );

  @Effect({ dispatch: false })
  loginExpired = this.actions$.pipe(
    ofType<ActionAuthExpired>(AuthActionTypes.EXPIRED),
    tap(() => {
      const jwt = this.localStorageService.getItem(AUTH_TOKEN);
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
      this.localStorageService.removeItem(AUTH_TABS);
      this.localStorageService.removeItem(AUTH_PERMISSION);
      this.service.logout(jwt).subscribe();
    })
  );

  @Effect({ dispatch: false })
  change = this.actions$.pipe(
    ofType<ActionChange>(AuthActionTypes.CHANGE),
    tap(() => {
      this.router.navigate(['auth', 'change-password']);
    })
  );

  @Effect()
  changePassword = () =>
    this.actions$.pipe(
      ofType<ActionChangePassword>(AuthActionTypes.CHANGE_PASSWORD),
      exhaustMap((action: ActionChangePassword) =>
        this.service.changePassword(action.payload).pipe(
          withLatestFrom(this.store.select(state => state.auth.credentials)),
          map(([data, res]) => {
            const credentials = { ...res, Password: action.payload.Pass1 };
            return new ActionAuthenticate({ credentials: credentials });
          }),
          catchError(err => of(new ActionChangePasswordFaild({ err })))
        )
      )
    );

  @Effect()
  changePasswordUser = () =>
    this.actions$.pipe(
      ofType<ActionChangePasswordUser>(AuthActionTypes.CHANGE_PASSWORD_USER),
      exhaustMap((action: ActionChangePasswordUser) =>
        this.service.changePasswordUser(action.payload).pipe(
          map((data) => {
            return new ActionChangePasswordUserSuccess({ change: data });
          }),
          catchError(err => of(new ActionChangePasswordUserFaild({ err })))
        )
      )
    );

  @Effect()
  checkResetPassword = () =>
    this.actions$.pipe(
      ofType<ActionChecktokenReset>(AuthActionTypes.CHECK_TOKEN_RESET),
      exhaustMap((action: ActionChecktokenReset) =>
        this.service.resetPasswordFinsih(action.payload).pipe(
          map((data) => {
            return new ActionChecktokenResetSuccess({ data: data });
          }),
          catchError(err => of(new ActionChecktokenResetFaild({ err })))
        )
      )
    );

  @Effect()
  resetPasswordFinish = () =>
    this.actions$.pipe(
      ofType<ActionResetPasswordFinish>(AuthActionTypes.RESET_PASSWORD_FINISH),
      exhaustMap((action: ActionResetPasswordFinish) =>
        this.service.changePassword(action.payload).pipe(
          map((data) => {
            return new ActionNavigateLogin();
          }),
          catchError(err => of(new ActionResetPasswordFinishFaild({ err })))
        )
      )
    );

  @Effect({ dispatch: false })
  navigateLogin = this.actions$.pipe(
    ofType<ActionNavigateLogin>(AuthActionTypes.NAVIGATE_LOGIN),
    tap(() => {
      this.router.navigate(['auth', 'login']);
    })
  );

  @Effect()
  loadAuthentication = ({ debounce = 500, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      ofType<ActionLoadAuthenticate>(AuthActionTypes.LOAD_AUTHENTICATE),
      switchMap((action: ActionLoadAuthenticate) => [
        new ActionAuthenticateSuccess({ token: action.payload }),
        new ActionFetchAccount(),
        new ActionFetchAccountMenu(),
        // write code get authority
        new ActionFetchAccountPermission(),
        new ActionLoginSuccess(),
      ]),
    );

  // @Effect()
  // authenticate = () =>
  //   this.actions$.pipe(
  //     ofType<ActionAuthenticate>(AuthActionTypes.AUTHENTICATE),
  //     exhaustMap((action: ActionAuthenticate) =>
  //       this.service.authenticate(action.payload.credentials).pipe(
  //         map(res => {
  //           if (res.mustChangePassword === true) {
  //               this.localStorageService.setItem(AUTH_CHANGE, res);
  //             return new ActionChange(res);
  //           } else {
  //             return new ActionLoadAuthenticate(res.token);
  //           }
  //         }),
  //         catchError(error => of(new ActionAuthenticateError({ error })))
  //       )
  //     )
  //   );
  @Effect()
  authenticate = () =>
    this.actions$.pipe(
      ofType<ActionAuthenticate>(AuthActionTypes.AUTHENTICATE),
      exhaustMap((action: ActionAuthenticate) => {
        this.localStorageService.removeItem(AUTH_CHANGE);
        this.localStorageService.removeItem(AUTH_TABS);
        return this.service.authenticate(action.payload.credentials).pipe(
          map(res => {
            if (res.mustChangePassword === true) {
              this.localStorageService.setItem(AUTH_CHANGE, res);
              return new ActionChange(res);
            } else {
              return new ActionLoadAuthenticate(res.token);
            }
          }),
          catchError(error => of(new ActionAuthenticateError({ error })))
        );
      }
      )
    );

  @Effect()
  fetchAccount = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccount>(AuthActionTypes.FETCH_ACCOUNT),
      switchMap(() =>
        this.service.fetch().pipe(
          map(account => new ActionFetchAccountSuccess({ account })),
          catchError(error => of(new ActionFetchAccountError({ error })))
        )
      )
    );

  @Effect()
  fetchPermission = () =>
    this.actions$.pipe(
      ofType<ActionFetchPermission>(AuthActionTypes.FETCH_PERMISSION),
      switchMap(() =>
        this.service.fetchPermission().pipe(
          map(permissions => new ActionFetchPermissionSuccess({ permissions })),
          catchError(error => of(new ActionFetchPermissionError({ error })))
        )
      )
    );

  @Effect({ dispatch: false })
  storeAccount = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountSuccess>(AuthActionTypes.FETCH_ACCOUNT_SUCCESS),
      tap(action => {
        const account = Object.assign({}, action.payload.account);
        // account.avatar = undefined;
        this.localStorageService.setItem(AUTH_ACCOUNT, account);
      })
    );

  @Effect()
  fetchAccountMenu = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountMenu>(AuthActionTypes.FETCH_ACCOUNT),
      switchMap(() =>
        this.service.fetchMenu().pipe(
          map(menu => new ActionFetchAccountMenuSuccess({ menu })),
          catchError(error => of(new ActionFetchAccountMenuError({ error })))
        )
      )
    );

  @Effect({ dispatch: false })
  storeAccountMenu = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountMenuSuccess>(
        AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS
      ),
      tap(action => {
        this.localStorageService.setItem(AUTH_MENU, action.payload.menu);
      })
    );

  @Effect({ dispatch: false })
  loginSuccess = this.actions$.pipe(
    ofType<ActionLoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => {
      let unsubPermission = new Subject();
      let unsubMenu = new Subject();
      this.store.select(state => state.auth.permission)
        .pipe(takeUntil(unsubPermission))
        .subscribe(permission => {
          if (permission) {
            unsubPermission.next();
            unsubPermission.complete();
            if (!permission.some(p => p.menuCode !== 'PROFILE_USER')) {
              this.store.select(s => s.auth.menu)
                .pipe(takeUntil(unsubMenu))
                .subscribe(menu => {
                  if (menu) {
                    unsubMenu.next();
                    unsubMenu.complete();
                    const profileSub = menu.find(m => m.code === 'PROFILE');
                    if (profileSub) {
                      const profileTab = profileSub.children.find(m => m.code === 'PROFILE_USER');
                      if (profileTab) {
                        this.store.dispatch(new ActionAddOrActiveTab({ tab: profileTab }));
                      }
                    }
                  }
                });
            }
          }
        });
      this.router.navigate(['']);
    })
  );

  @Effect({ dispatch: false })
  addOrActiveTab = () =>
    this.actions$.pipe(
      ofType<ActionAddOrActiveTab>(
        AuthActionTypes.TAB_ADD_OR_ACTIVE
      ),
      tap(action => {
        const tabs: any[] = Object.assign([], this.localStorageService.getItem(AUTH_TABS));
        const index = tabs.findIndex(t => t.type === 'tab' && t.code === action.payload.tab.code);
        if (index === -1) {
          tabs.push(action.payload.tab);
          this.localStorageService.setItem(AUTH_TABS, tabs);
        }
      })
    );

  @Effect({ dispatch: false })
  removeTab = () =>
    this.actions$.pipe(
      ofType<ActionRemoveTab>(
        AuthActionTypes.TAB_REMOVE
      ),
      tap(action => {
        const tabs: MainMenuItems[] = Object.assign([], this.localStorageService.getItem(AUTH_TABS));
        const index = tabs.findIndex(t => t.type === 'tab' && t.code === action.payload.code);
        if (index !== -1) {
          tabs.splice(index, 1);
          this.localStorageService.setItem(AUTH_TABS, tabs);
        }
      })
    );

  @Effect()
  fetchAccountPermission = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountPermission>(AuthActionTypes.FETCH_ACOUNT_PERMISSON),
      switchMap(() =>
        this.service.getListPermision().pipe(
          map(permissions => {
            console.log("permisson", permissions);
            return new ActionFetchAccountPermissionSuccess({ permissions })
          }),
          catchError(error => of(new ActionFetchAccountPermissionError({ error })))
        )
      )
    );

  @Effect({ dispatch: false })
  storeAccountPermission = () =>
    this.actions$.pipe(
      ofType<ActionFetchAccountPermissionSuccess>(
        AuthActionTypes.FETCH_ACOUNT_PERMISSON_SUCCESS
      ),
      tap(action => {
        this.localStorageService.setItem(AUTH_PERMISSION, action.payload.permissions);
      })
    );

}
