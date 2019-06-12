import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { CategoryDepartmentActionTypes, LoadCategoryDepartments, LoadCategoryDepartmentsFaild, LoadCategoryDepartmentsSuccess } from '../actions/category-department.actions';
import { CategoryDepartmentService } from '../services/category-department.service';



@Injectable()
export class CategoryDepartmentEffects {
  constructor(private actions$: Actions,
    private service$: CategoryDepartmentService
  ) { }


  @Effect()
  loadCategoryDepartments$ = this.actions$.pipe(
    ofType(CategoryDepartmentActionTypes.LoadCategoryDepartments),
    switchMap((action: LoadCategoryDepartments) =>
      this.service$.fetch(action.payload.pagination).pipe(
        map(data => new LoadCategoryDepartmentsSuccess({ data: data, pagination: action.payload.pagination })),
        catchError(err => of(new LoadCategoryDepartmentsFaild({ err })))
      )
    )
  );




}
