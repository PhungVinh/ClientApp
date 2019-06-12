import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {concatMap, exhaustMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
    EncryptionActionTypes,
    EncryptionActions,
    LoadFieldEncryptions,
    LoadFieldEncryptionsSuccess,
    LoadFieldEncryptionsFailed,
    LoadModuledEncryptionsSuccess,
    LoadModuledEncryptionsFaild,
    LoadModuledEncryptions,
    LoadFieldByModuledEncryptions,
    LoadFieldByModuledEncryptionsSuccess,
    LoadFieldByModuledEncryptionsFaild,
    UpdateEncryption,
    UpdateEncryptionFaild, UpdateEncryptionSuccess
} from '../actions/encryption.actions';
import {catchError, map, withLatestFrom} from 'rxjs/internal/operators';
import { mergeMap} from 'rxjs/operators';
import {
    LoadOrganizations,
    LoadOrganizationsFaild,
    LoadOrganizationsSuccess,
    OrganizationActionTypes
} from '../actions/organization.actions';
import {EncryptionService} from '../services/encryption/encryption.service';
import {UpdateCustomerSuccess} from '../actions/customer.actions';
import {State} from '../../../admin.state';
import {Store} from '@ngrx/store';


@Injectable()
export class EncryptionEffects {


  // @Effect()
  // loadEncryptions$ = this.actions$.pipe(
  //   ofType(EncryptionActionTypes.LoadFieldEncryptions),
  //   exhaustMap(() =>
  //       this.service.fetch().pipe(
  //           map(data => {
  //             return new LoadFieldEncryptionsSuccess({res: data});
  //           }),
  //           catchError(err => of(new LoadFieldEncryptionsFailed({ err })))
  //       )
  //   )
  // );
  @Effect()
    loadEncryptions$ = this.actions$.pipe(
        ofType(EncryptionActionTypes.LoadFieldEncryptions),
        exhaustMap((action: LoadFieldEncryptions) =>
            this.service.fetch(action.payload).pipe(
                map(data => {
                    return new LoadFieldEncryptionsSuccess({res: data});
                }),
                catchError(err => of(new LoadFieldEncryptionsFailed({ err })))
            )
        )
    );
    @Effect()
    loadModuleEncryptions$ = this.actions$.pipe(
        ofType(EncryptionActionTypes.LoadModuledEncryptions),
        exhaustMap((action: LoadModuledEncryptions) =>
            this.service.getModuleEncrytion().pipe(
                map(data => {
                    return new LoadModuledEncryptionsSuccess({data: data});
                }),
                catchError(err => of(new LoadModuledEncryptionsFaild({ err })))
            )
        )
    );
    @Effect()
    loadFieldByModuleEncryptions$ = this.actions$.pipe(
        ofType(EncryptionActionTypes.LoadFieldByModuledEncryptions),
        exhaustMap((action: LoadFieldByModuledEncryptions) =>
            this.service.getFieldByModuleEncrytion(action.payload).pipe(
                map(data => {
                    return new LoadFieldByModuledEncryptionsSuccess({data: data});
                }),
                catchError(err => of(new LoadFieldByModuledEncryptionsFaild({ err })))
            )
        )
    );
    // @Effect()
    // updateEncryptions$ = this.actions$.pipe(
    //     ofType(EncryptionActionTypes.UpdateEncryption),
    //     exhaustMap((action: UpdateEncryption) =>
    //         this.service.updateEncrytion(action.payload).pipe(
    //             withLatestFrom(this.store.select(state => {
    //                 console.log('vao effect', state.admin.encryption.paramCode);
    //                 return  state.admin.encryption.paramCode;
    //             } )),
    //             mergeMap(([data, res]) => [
    //                  new UpdateEncryptionSuccess({data: true}),
    //                 new LoadFieldEncryptions({orgCode : res.orgCode}),
    //                 new LoadFieldByModuledEncryptions({parentCode:  res.parentCode, orgCode: res.orgCode})
    //             ]),
    //             catchError(err => { return of(new UpdateEncryptionFaild({ err })); })
    //         )
    //     )
    // );
    @Effect()
    updateEncryptions$ = this.actions$.pipe(
        ofType(EncryptionActionTypes.UpdateEncryption),
        exhaustMap((action: UpdateEncryption) =>
            this.service.updateEncrytion(action.payload).pipe(
                withLatestFrom(this.store.select(state => {
                    console.log('vao effect', state.admin.encryption.paramCode);
                    return  state.admin.encryption.paramCode;
                } )),
                mergeMap(([data, res]) => {
                    console.log('res', res, action.payload);
                    if (res && <any>res.parentCode === <any>action.payload.Attributes[0].ParentCode) {
                        console.log('res1');
                        return [
                            new UpdateEncryptionSuccess({data: true}),
                            new LoadFieldEncryptions({orgCode : res.orgCode}),
                            new LoadFieldByModuledEncryptions({parentCode:  res.parentCode, orgCode: res.orgCode})
                        ];
                    } else {
                        console.log('res2');
                        return [
                            new UpdateEncryptionSuccess({data: true}),
                            new LoadFieldEncryptions({orgCode :  action.payload.OrgCode}),
                        ];
                    }
                }),
                catchError(err => { console.log('vaodayhe'); return of(new UpdateEncryptionFaild({ err })); })
            )
        )
    );
    // @Effect()
    // updateEncryptions$ = this.actions$.pipe(
    //     ofType(EncryptionActionTypes.UpdateEncryption),
    //     exhaustMap((action: UpdateEncryption) =>
    //         this.service.updateEncrytion(action.payload).pipe(
    //             mergeMap(data => {
    //                 console.log('effect en', action.payload);
    //                 return [
    //                 new UpdateEncryptionSuccess({data: true}),
    //                 new LoadFieldEncryptions({orgCode : action.payload.OrgCode}),
    //                 new LoadFieldByModuledEncryptions({parentCode:  action.payload.Attributes.ParentCode, orgCode: action.payload.OrgCode})
    //             ]; }),
    //             catchError(err => { return of(new UpdateEncryptionFaild({ err })); })
    //         )
    //     )
    // );
  constructor(
      private actions$: Actions<EncryptionActions>,
      private service: EncryptionService,
      public store: Store<State>
  ) {}

}
