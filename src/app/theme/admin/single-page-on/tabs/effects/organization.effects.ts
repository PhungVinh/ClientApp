import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
    GetLinkImage,
    GetLinkImageFaild,
    GetLinkImageSuccess,
    LoadAllCategory,
    LoadAllCategoryFaild,
    LoadAllCategorySuccess,
    LoadInforOrganizations,
    LoadInforOrganizationsErr,
    LoadInforOrganizationsSuccess,
    LoadOrganizations,
    LoadOrganizationsFaild,
    LoadOrganizationsSuccess,
    OrganizationActionTypes,
    OrganizationsCreate,
    OrganizationsDelete,
    OrganizationsInforUpdate,
    OrganizationsInforUpdateFaild,
    OrganizationsInforUpdateSuccess, OrganizationsServicePack, OrganizationsServicePackFaild,
    OrganizationsServicePackSuccess,
    OrganizationsUpdate,
    OrganizationsUpdateFaild,
    OrganizationsUpdateSuccess,
    OrganizationsUploadFile,
    OrganizationsUploadFileFaild,
    OrganizationsUploadFileSuccess,
    UploadFileOrganizations,
    UploadFileOrganizationsFaild,
    UploadFileOrganizationsSuccess
} from '../actions/organization.actions';
import {of} from 'rxjs';
import {catchError, map, withLatestFrom} from 'rxjs/internal/operators';
import {exhaustMap, mergeMap} from 'rxjs/operators';
import {ITEMS_PER_PAGE} from '../../../../../shared/constants/pagination.constants';
import {OrganizationService} from "../services/organization/organization.service";
import {Store} from "@ngrx/store";
import {State} from "../../../admin.state";
import {ProfileActionTypes, UploadFileProfilesFaild, UploadFileProfilesSuccess} from '../actions/profile.actions';
import {ActionFetchAccount} from "../../../../../core/auth/auth.actions";



@Injectable()
export class OrganizationEffects {



  constructor(
      private actions$: Actions,
      private service$: OrganizationService,
      public store: Store<State>
  ) {}
    @Effect()
    loadCOrganization$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.LoadOrganizations),
        exhaustMap((action: LoadOrganizations) =>
            this.service$.fetch(action.payload.pagination).pipe(
                map(data => {
                    console.log('vao day ko', data);
                   return new LoadOrganizationsSuccess({ data: data, pagination: action.payload.pagination });
                }),
                catchError(err => of(new LoadOrganizationsFaild({ err })))
            )
        )
    );
    // @Effect()
    // addOrganization$ = () =>
    //     this.actions$.pipe(
    //         ofType<OrganizationsCreate>(OrganizationActionTypes.OrganizationsCreate),
    //         exhaustMap((action: OrganizationsCreate) =>
    //             this.service$.addOrganization(action.payload.oranization).pipe(
    //                 withLatestFrom(this.store.select(state => state.admin.organization.param )),
    //                 mergeMap(([data, res]) => [
    //                     new OrganizationsUpdateSuccess({ data: true}),
    //                     new LoadOrganizations({pagination: {...res, currPage: 1}}),
    //                     // new LoadOrganizations({pagination: {
    //                     //         DateFrom: '',
    //                     //         DateTo: '',
    //                     //         TextSearch: '',
    //                     //         IsActive: 2,
    //                     //         currPage: 1,
    //                     //         recodperpage: ITEMS_PER_PAGE
    //                     //     }}),
    //                 ]),
    //                 catchError(err => of(new OrganizationsUpdateFaild({ err })))
    //             )
    //         )
    //     );
    @Effect()
    addOrganization$ = () =>
        this.actions$.pipe(
            ofType<OrganizationsCreate>(OrganizationActionTypes.OrganizationsCreate),
            exhaustMap((action: OrganizationsCreate) =>
                this.service$.addOrganization(action.payload.oranization).pipe(
                    withLatestFrom(this.store.select(state => {
                        console.log('goi pah trang', state, state.admin.organization.param );
                        return state.admin.organization.param;
                    } )),
                    mergeMap(([data, res]) => [
                        new OrganizationsUpdateSuccess({ data: true}),
                        new LoadOrganizations({pagination: {...res, currPage: 1}}),
                        // new LoadOrganizations({pagination: {
                        //         DateFrom: '',
                        //         DateTo: '',
                        //         TextSearch: '',
                        //         IsActive: 2,
                        //         currPage: 1,
                        //         recodperpage: ITEMS_PER_PAGE
                        //     }}),
                    ]),
                    catchError(err => of(new OrganizationsUpdateFaild({ err })))
                )
            )
        );
    @Effect()
    updateOrganization$ = () =>
        this.actions$.pipe(
            ofType<OrganizationsUpdate>(OrganizationActionTypes.OrganizationsUpdate),
            exhaustMap((action: OrganizationsUpdate) =>
                this.service$.updateOrganization(action.payload.oranization).pipe(
                    withLatestFrom(this.store.select(state => {
                        console.log('goi pah trang update', state, state.admin.organization.param );
                        return state.admin.organization.param;
                    } )),
                    mergeMap(([data, res]) => [
                        new OrganizationsUpdateSuccess({ data: true}),
                        new LoadOrganizations({pagination: res}),
                    ]),
                    catchError(err => of(new OrganizationsUpdateFaild({ err })))
                )
            )
        );
    @Effect()
    deleteOrganization$ = () =>
        this.actions$.pipe(
            ofType<OrganizationsDelete>(OrganizationActionTypes.OrganizationsDelete),
            exhaustMap((action: OrganizationsDelete) =>
                this.service$.deleteOrganization(action.payload.organizationId).pipe(
                    withLatestFrom(this.store.select(state => state.admin.organization.param )),
                    mergeMap(([data, res])  => [
                        new OrganizationsUpdateSuccess({ data: true}),
                        new LoadOrganizations({pagination: res}),
                    ]),
                    catchError(err => of(new OrganizationsUpdateFaild({ err })))
                )
            )
        );
    @Effect()
    uploadFileOrganization$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.OrganizationsUploadFile),
        exhaustMap((action: OrganizationsUploadFile) =>
            this.service$.uploadFile(action.payload.file).pipe(
                mergeMap(data => [
                    new OrganizationsUploadFileSuccess({load: true }),
                    // new ActionFetchAccount()
                ]),
                catchError(err => of(new OrganizationsUploadFileFaild({ err })))
            )
        )
    );
    @Effect()
    loadInfoOrganization$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.LoadInforOrganizations),
        exhaustMap(() =>
            this.service$.getInforOrg().pipe(
                map(data => {
                    console.log('vao day ko', data);
                    return new LoadInforOrganizationsSuccess({ data: data});
                }),
                catchError(err => of(new LoadInforOrganizationsErr({ err })))
            )
        )
    );
    @Effect()
    loadAllCategory$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.LoadAllCategory),
        exhaustMap((action: LoadAllCategory) =>
            this.service$.getAllCategory().pipe(
                map(data => {
                    console.log('vao day ko', data);
                    return new LoadAllCategorySuccess({ data: data});
                }),
                catchError(err => of(new LoadAllCategoryFaild({ err })))
            )
        )
    );
    @Effect()
    uploadFileOrg$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.UploadFileOrganizations),
        exhaustMap((action: UploadFileOrganizations) =>
            this.service$.uploadFileInfor(action.payload.file).pipe(
                mergeMap(data => [
                    new UploadFileOrganizationsSuccess({ data: true}),
                    // new LoadInforOrganizations (),
                    // new GetLinkImage ({fileName: data})
                ]),
                catchError(err => of(new UploadFileOrganizationsFaild({ err })))
            )
        )
    );
    @Effect()
    getLinkImage$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.GetLinkImage),
        exhaustMap((action: GetLinkImage) =>
            this.service$.getLinkImage(action.payload).pipe(
                map(data => {
                    return new GetLinkImageSuccess({ data: data});
                }),
                catchError(err => of(new GetLinkImageFaild({ err })))
            )
        )
    );
    @Effect()
    updateInforOrg$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.OrganizationsInforUpdate),
        exhaustMap((action: OrganizationsInforUpdate) =>
            this.service$.updateOrganizationInfor(action.payload).pipe(
                mergeMap(data => [
                     new OrganizationsInforUpdateSuccess({ data: true}),
                    new LoadInforOrganizations()
                ]),
                catchError(err => of(new OrganizationsInforUpdateFaild({ err })))
            )
        )
    );
    @Effect()
    getServicePack$ = this.actions$.pipe(
        ofType(OrganizationActionTypes.OrganizationsServicePack),
        exhaustMap((action: OrganizationsServicePack) =>
            this.service$.getOrgServicePack(action.payload).pipe(
                map(data => {
                    return new OrganizationsServicePackSuccess({ data: data});
                }),
                catchError(err => of(new OrganizationsServicePackFaild({ err })))
            )
        )
    );
}
