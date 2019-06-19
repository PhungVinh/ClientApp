import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    LoadCategories, LoadCategorySuccess, LoadParentCategory, LoadParentCategorySuccess, LoadChildrenCategorySuccess, LoadChildrenCategory, AddCategory, AddCategorySuccess, GetCategoryEdit, GetCategoryEditSuccess, DeleteCategory, DeleteCategorySuccess, UpdateCategory, DeleteCategoryFail, UpdateCategorySuccess, AddCategoryFail, LoadCategoryFail, LoadParentCategoryFail, LoadChildrenCategoryFail, GetCategoryEditFail, UpdateCategoryFail
} from '../actions/category.actions';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { exhaustMap, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CategoryService } from '../services/category/category.service';
import { CategoryActionTypes } from '../actions/category.actions';
import { Store } from "@ngrx/store";
import {State} from "../../../admin.state";

@Injectable()

export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private service$: CategoryService,
        public store: Store<State>
    ) {}

    @Effect()
    loadCategory$ = this.actions$.pipe(
        ofType(CategoryActionTypes.LoadCategories),
        exhaustMap((action: LoadCategories) => {
            return this.service$.fetchCategory(action.payload).pipe(
                map(data => {
                    return new LoadCategorySuccess(data)
                }),
                catchError(err => {
                    return of(new LoadCategoryFail({err}));
                })
            )
        })
    )

    @Effect()
    loadParentCategory$ = this.actions$.pipe(
        ofType(CategoryActionTypes.LoadParentCategory),
        exhaustMap((action: LoadParentCategory) => {
            return this.service$.fetchParentCategory().pipe(
                map(data => {
                    return new LoadParentCategorySuccess(data)
                }),
                catchError(err => {
                    return of(new LoadParentCategoryFail({ err }))
                })
            )
        })
    )

    @Effect()
    loadChildrenCategory$ = this.actions$.pipe(
        ofType(CategoryActionTypes.LoadChildrenCategory),
        exhaustMap((action: LoadChildrenCategory) => {
            return this.service$.fetchChildrenCategory().pipe(
                map(data => {
                    return new LoadChildrenCategorySuccess(data)
                }),
                catchError(err => {
                    return of(new LoadChildrenCategoryFail({err}))
                })
            )
        })
    )

    @Effect()
    addCategory$ = this.actions$.pipe(
        ofType(CategoryActionTypes.AddCategory),
        exhaustMap((action: AddCategory) => {
            return this.service$.addCategory(action.payload.body).pipe(
                withLatestFrom(this.store.select(state => {
                    return state.admin.category.reqOption;
                } )),
                mergeMap(([data, res]) => {
                    console.log('res', res);
                    return [
                        new AddCategorySuccess(),
                        new LoadCategories({ TextSearch: res.query.textSearch, currPage: 1, recodperpage: 10 })
                    ]
                }),
                catchError(({ error }) => {
                    return of(new AddCategoryFail({ err: error }));
                })
            )
        })
    )

    @Effect()
    getCategoryEdit$ = this.actions$.pipe(
        ofType(CategoryActionTypes.GetCategoryEdit),
        exhaustMap((action: GetCategoryEdit) => {
            return this.service$.getCategoryEdit(action.payload).pipe(
                map(data => {
                    return new GetCategoryEditSuccess(data);
                }),
                catchError(err => {
                    return of(new GetCategoryEditFail({ err }))
                })
            )
        })
    )


    @Effect()
    deleteCategory$ = () =>
        this.actions$.pipe(
            ofType(CategoryActionTypes.DeleteCategory),
            exhaustMap((action: DeleteCategory) => {
                return this.service$.deleteCategory(action.payload).pipe(
                    withLatestFrom(this.store.select(state => {
                        return state.admin.category.reqOption;
                    } )),
                    mergeMap(([data, res]) => [
                        new DeleteCategorySuccess(data),
                        new LoadCategories({ TextSearch: res.query.textSearch, currPage: 1, recodperpage: 10 })
                    ]),
                    catchError(({ error }) => {
                        return of(new DeleteCategoryFail({error: error}));
                    })
                )
            })
        );

        @Effect()
        updateCategory$ = () =>
            this.actions$.pipe(
                ofType(CategoryActionTypes.UpdateCategory),
                exhaustMap((action: UpdateCategory) => {
                    return this.service$.updateCategory(action.payload.category).pipe(
                        withLatestFrom(this.store.select(state => {
                            return state.admin.category.reqOption;
                        } )),
                        mergeMap(([data, res]) => [
                            new UpdateCategorySuccess(),
                            new LoadCategories({ TextSearch: res.query.textSearch, currPage: 1, recodperpage: 10 })
                        ]),
                        catchError(({ error: err }) => {
                            return of(new UpdateCategoryFail({ err }));
                        })
                    )
                })
            );
    
}