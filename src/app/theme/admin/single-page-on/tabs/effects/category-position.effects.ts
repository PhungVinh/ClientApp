import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryPositionService } from '../services/category-position.service';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {
  CategoryPositionActionTypes,
  LoadCategoryPositions,
  LoadCategoryPositionsSuccess,
  LoadCategoryPositionsFaild
} from '../actions/category-position.actions';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { exhaustMap, mergeMap } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from '../../../../../shared/constants/pagination.constants';


@Injectable()
export class CategoryPositionEffects {

  constructor(
    private actions$: Actions,
    private service$: CategoryPositionService
  ) { }

  @Effect()
  loadCategoryPositions$ = this.actions$.pipe(
    ofType(CategoryPositionActionTypes.LoadCategoryPositions),
    exhaustMap((action: LoadCategoryPositions) =>
      this.service$.fetch(action.payload.pagination).pipe(
        map(data => new LoadCategoryPositionsSuccess({ data: data, pagination: action.payload.pagination })),
        catchError(err => of(new LoadCategoryPositionsFaild({ err })))
      )
    )
  );




}
