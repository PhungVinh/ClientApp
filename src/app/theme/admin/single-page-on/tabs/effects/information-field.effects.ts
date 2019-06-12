import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {concatMap, exhaustMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {
    InformationFieldActionTypes,
    InformationFieldActions,
    LoadConstraints,
    LoadConstraintsSuccess,
    LoadCategoryLink,
    LoadCategoryLinkSuccess,
    LoadCategoryChildLinkSuccess,
    LoadCategoryChildLink,
    UpdateInformationField, UpdateInformationFieldSuccess, LoadInformationFields, LoadInformationFieldsSuccess
} from '../actions/information-field.actions';
import {catchError, map} from 'rxjs/internal/operators';
import {ConstraintsService} from '../services/constraints/constraints.service';
import {CategoryService} from '../services/category/category.service';
import {FormConfigService} from '../services/form-config/form-config.service';


@Injectable()
export class InformationFieldEffects {


  @Effect()
  loadInformationFields$ = this.actions$.pipe(
    ofType(InformationFieldActionTypes.LoadInformationFields),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
      exhaustMap((action: LoadInformationFields) =>
          this.formConfigService$.getFormConfig().pipe(
              map(data => new LoadInformationFieldsSuccess({formConfig: data})),
              // catchError(err => of(new LoadOrganizationsFaild({ err })))
          )
      )
  );

    @Effect()
    loadConstraints$ = this.actions$.pipe(
        ofType(InformationFieldActionTypes.LoadConstraints),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        exhaustMap((action: LoadConstraints) =>
            this.service$.getAllConstraints().pipe(
                map(data => new LoadConstraintsSuccess({listConstraints: data})),
                // catchError(err => of(new LoadOrganizationsFaild({ err })))
            )
        )
    );

    @Effect()
    loadCategoryLink$ = this.actions$.pipe(
        ofType(InformationFieldActionTypes.LoadCategoryLink),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        exhaustMap((action: LoadCategoryLink) =>
            this.cateService$.getAllCategory().pipe(
                map(data => new LoadCategoryLinkSuccess({listCate: data})),
                // catchError(err => of(new LoadOrganizationsFaild({ err })))
            )
        )
    );

    @Effect()
    loadCategoryChildLink$ = this.actions$.pipe(
        ofType(InformationFieldActionTypes.LoadCategoryChildLink),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        exhaustMap((action: LoadCategoryChildLink) =>
            this.cateService$.getAllChildCategory().pipe(
                map(data => new LoadCategoryChildLinkSuccess({listCateChild: data})),
                // catchError(err => of(new LoadOrganizationsFaild({ err })))
            )
        )
    );

    @Effect()
    updateInformationField$ = this.actions$.pipe(
        ofType(InformationFieldActionTypes.UpdateInformationField),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        exhaustMap((action: UpdateInformationField) =>
            this.formConfigService$.updateFormConfig(action.payload.informationForm).pipe(
                map(data => new UpdateInformationFieldSuccess({informationForm: data})),
                // catchError(err => of(new LoadOrganizationsFaild({ err })))
            )
        )
    );



    constructor(private actions$: Actions<InformationFieldActions>, private service$: ConstraintsService, private cateService$: CategoryService, private formConfigService$: FormConfigService) {}

}
