import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    LoadAuthorities,
    AuthorityActionTypes,
    LoadAuthoritySuccess,
    AddAuthority,
    AddAuthoritySuccess,
    DeleteAuthority,
    DeleteAuthoritySuccess,
    LoadListAuthorityFilter,
    LoadAllAuthority,
    LoadAllAuthoritySuccess,
    LoadAllRole,
    LoadAllRoleSuccess,
    CopyAuthority,
    CopyAuthoritySuccess,
    AuthorityUserEdit,
    AuthorityUserEditSuccess,
    AuthorityInfoSuccess,
    AuthorityInfoFaild,
    UpdateAuthority,
    UpdateAuthoritySuccess,
    AddAuthorityFail,
    LoadAuthorityFail,
    DeleteAuthorityFail,
    LoadAllAuthorityFail,
    LoadAllRoleFail,
    CopyAuthorityFail,
    AuthorityUserEditFail

} from '../actions/authority.actions';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { AuthorityService } from '../services/authority/authority.service';
import { PER_PAGE } from 'src/app/shared/constants/authority.constants';
import * as _ from 'lodash';


@Injectable()
export class AuthorityEffects {
    constructor(
        private actions$: Actions,
        private service$: AuthorityService
    ) { }
    @Effect()
    loadAuthority$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.LoadAuthorities),
        exhaustMap((action: LoadAuthorities) => {
            return this.service$.getAllAuthority(action.payload).pipe(
                map(data => {
                    return new LoadAuthoritySuccess(data)
                }),
                catchError(({ error: err }) => {
                    return of(new LoadAuthorityFail(err))
                })
            )
        })
    )

    @Effect()
    newAuthority$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.AddAuthority),
        exhaustMap((action: AddAuthority) => {
            console.log('newAuthority');
            return this.service$.addAuthority(action.payload).pipe(
                // mergeMap(data => [
                //     new AddAuthoritySuccess({ authority: data.body.value }),
                //     new LoadAuthorities({textSearch: '', currPage: 1, Record: PER_PAGE })
                // ]),
                map(data => new AddAuthoritySuccess({ authority: data.body.value })),
                catchError(({ error: err }) => {
                    return of(new AddAuthorityFail({ err }));
                })
            )
        })
    )

    @Effect()
    editAuthority$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.UpdateAuthority),
        exhaustMap((action: UpdateAuthority) => {
            return this.service$.updateAuthority(action.payload).pipe(
                // mergeMap(data => [
                //     new UpdateAuthoritySuccess({ authority: data.body.value }),
                //     new LoadAuthorities({textSearch: '', currPage: 1, Record: PER_PAGE })
                // ]),
                map(data => new UpdateAuthoritySuccess({ authority: data.body.value })),
                catchError(({ error: err }) => {
                    return of(new AddAuthorityFail({ err }));
                })
            )
        })
    )

    @Effect()
    deleteAuthority$ = () =>
        this.actions$.pipe(
            ofType(AuthorityActionTypes.DeleteAuthority),
            exhaustMap((action: DeleteAuthority) => {
                return this.service$.deleteAuthority(action.payload.authority.authorityId).pipe(
                    mergeMap(data => [
                        new DeleteAuthoritySuccess({ authority: action.payload.authority }),
                        new LoadAuthorities({ textSearch: '', currPage: 1, recordperpage: PER_PAGE })
                    ]),
                    catchError(err => {
                        return of(new DeleteAuthorityFail({ err: err }));
                    })
                )
            })
        );

    @Effect()
    changePage$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.LoadListAuthorityFilter),
        map((action: LoadListAuthorityFilter) => {
            return new LoadAuthorities({ textSearch: action.payload.filter.textSearch, currPage: 1, recordperpage: PER_PAGE })
        })
    );


    @Effect()
    loadAllAuthority$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.LoadAllAuthority),
        switchMap((action: LoadAllAuthority) => this.service$.getAllAuthority(action.payload).pipe(
            map(data => {
                return new LoadAllAuthoritySuccess(data)
            }),
            catchError(err => {
                return of(new LoadAllAuthorityFail({ err }));
            })
        )
        )
    )

    @Effect()
    loadAllRole$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.LoadAllRole),
        switchMap((action: LoadAllRole) => {
            return this.service$.getRoleByModule(action.payload).pipe(
                map(data => {
                    return new LoadAllRoleSuccess(data);
                }),
                catchError(err => {
                    return of(new LoadAllRoleFail({ err }))
                })
            )
        })
    )

    @Effect()
    copyAuthority$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.CopyAuthority),
        switchMap((action: CopyAuthority) => {
            return this.service$.copyAuthority(action.payload.id).pipe(
                map(data => {
                    if (action.payload.parentCode) {
                        data = data.dataSelected.filter(modul => modul.parentCode === action.payload.parentCode)
                    } else {
                        data = data.dataSelected
                    }
                    return new CopyAuthoritySuccess({ data })
                }),
                catchError(err => {
                    return of(new CopyAuthorityFail({ err }))
                })
            )
        })
    )
    @Effect()
    authorityUserEdit$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.AuthorityUserEdit),
        exhaustMap((action: AuthorityUserEdit) => {
            return this.service$.authorityUserEdit(action.payload).pipe(
                map(data => {
                    return new AuthorityUserEditSuccess()
                }),
                catchError(err => {
                    return of(new AuthorityUserEditFail({ err }));
                })
            )
        })
    )
    @Effect()
    authorityInfo$ = this.actions$.pipe(
        ofType(AuthorityActionTypes.AuthorityInfo),
        exhaustMap(() => {
            return this.service$.getAuthorityInfo().pipe(
                map(data => {
                    return new AuthorityInfoSuccess({ data: data })
                }),
                catchError(err => of(new AuthorityInfoFaild({ err })))
            )
        })
    )
}
