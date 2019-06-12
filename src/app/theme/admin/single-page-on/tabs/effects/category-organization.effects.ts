import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { 
  CategoryOrganizationActionTypes, 
  CategoryOrganizationActions,
  LoadCategoryOrganizations,
  LoadCategoryOrganizationsSuccess,
  LoadCategoryOrganizationsFaild
} from '../actions/category-organization.actions';
import {of} from 'rxjs';
import {catchError, map, withLatestFrom} from 'rxjs/internal/operators';
import {exhaustMap, mergeMap} from 'rxjs/operators';
import {ITEMS_PER_PAGE} from '../../../../../shared/constants/pagination.constants';
import {CategoryOrganizationService} from "../services/category-organization.service";
import {Store} from "@ngrx/store";
import {State} from "../../../admin.state";


@Injectable()
export class CategoryOrganizationEffects {
  constructor(
    private actions$: Actions,
    private service$: CategoryOrganizationService,
    public store: Store<State>
    ) {}


    @Effect()
    loadCategoryOrganization$ = this.actions$.pipe(
        ofType(CategoryOrganizationActionTypes.LoadCategoryOrganizations),
        exhaustMap((action: LoadCategoryOrganizations) =>
             this.service$.fetch(action.payload.pagination).pipe(
                map(data => {
                   return new LoadCategoryOrganizationsSuccess({ data: data, pagination: action.payload.pagination });
                }),
                catchError(err => of(new LoadCategoryOrganizationsFaild({ err })))
            )
        )
    );


  

}
