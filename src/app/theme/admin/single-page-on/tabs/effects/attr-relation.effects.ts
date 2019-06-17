import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {exhaustMap, mergeMap} from 'rxjs/operators';
import {
    AttrRelationActionTypes,
    LoadAttrRelationsSuccess,
    LoadAttrRelations,
    AddAttrRelations,
    AddAttrRelationsSuccess,
    UpdateAttrRelations,
    UpdateAttrRelationsSuccess,
    DeleteAttrRelationsSuccess,
    DeleteAttrRelations,
    AddAttrRelationsFailed,
    UpdateAttrRelationsFailed
} from '../actions/attr-relation.actions';
import {catchError, map, withLatestFrom} from 'rxjs/internal/operators';
import {ConstraintsService} from '../services/constraints/constraints.service';
import {ITEMS_PER_PAGE} from '../../../../../shared/constants/pagination.constants';
import {State} from '../../../admin.state';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';


@Injectable()
export class AttrRelationEffects {


    @Effect()
    loadAttrRelations$ = this.actions$.pipe(
        ofType(AttrRelationActionTypes.LoadAttrRelations),
        exhaustMap((action: LoadAttrRelations) =>
            this.constraintService$.getAllConstraintsPagi(action.payload.pagination).pipe(
                map(data => new LoadAttrRelationsSuccess({data: data, pagination: action.payload.pagination})),
            )
        )
    );

    @Effect()
    addAttrRelations$ = () => this.actions$.pipe(
        ofType<AddAttrRelations>(AttrRelationActionTypes.AddAttrRelations),
        exhaustMap((action: AddAttrRelations) => {
                return this.constraintService$.addConstraint(action.payload.data).pipe(
                    withLatestFrom(this.store.select(state => {
                        console.log('goi pah trang', state.admin.attrRelation.param);
                        return state.admin.attrRelation.param;
                    } )),
                    mergeMap(([data, res]) => [
                        new LoadAttrRelations({pagination: {...res, currPage: 1}}),
                        new LoadAttrRelations({
                            pagination: {
                                TextSearch: '',
                                currPage: 1,
                                recodperpage: ITEMS_PER_PAGE
                            }
                        }),
                    ]),
                    catchError(err => of(new AddAttrRelationsFailed({ err })))
                );
            }
        )
    );

    @Effect()
    updateAttrRelations$ = this.actions$.pipe(
        ofType(AttrRelationActionTypes.UpdateAttrRelations),
        exhaustMap((action: UpdateAttrRelations) => {
                return this.constraintService$.updateConstraint(action.payload.data).pipe(
                    withLatestFrom(this.store.select(state => {
                        console.log('goi pah trang', state.admin.attrRelation.param);
                        return state.admin.attrRelation.param;
                    } )),
                    mergeMap(([data, res]) => [
                        new UpdateAttrRelationsSuccess({ data: true }),
                        new LoadAttrRelations({
                            pagination: res
                        }),
                    ]),
                    // map(data => new UpdateAttrRelationsSuccess({data: data})),
                    catchError(err => of(new UpdateAttrRelationsFailed({ err })))
                );
            }
        )
    );

    // @Effect()
    // deleteAttrRelations$ = => this.actions$.pipe(
    //     ofType<DeleteAttrRelations>(AttrRelationActionTypes.DeleteAttrRelations),
    //     exhaustMap((action: DeleteAttrRelations) => 
    //             return this.constraintService$.deleteConstraint(action.payload.Id).pipe(
    //                 withLatestFrom(this.store.select(state => {
    //                      state.admin.attrRelation.param;
    //                 } )),
    //                 mergeMap(([data, res]) => [
    //                     new DeleteAttrRelationsSuccess(),
    //                     new LoadAttrRelations({
    //                         pagination: res
    //                     }),
    //                 ]),
    //                 // map(data => new UpdateAttrRelationsSuccess({data: data})),
    //             );
    //         }
    //     )
    // );

    @Effect()
    deleteAttrRelations$ = () =>
      this.actions$.pipe(
        ofType<DeleteAttrRelations>(AttrRelationActionTypes.DeleteAttrRelations),
        exhaustMap((action: DeleteAttrRelations) =>
          this.constraintService$.deleteConstraint(action.payload.Id).pipe(
            withLatestFrom(this.store.select(state => state.admin.attrRelation.param)),
            mergeMap(([data, res]) => [
            new DeleteAttrRelationsSuccess(),
              new LoadAttrRelations({ pagination: res }),
            ]),
            // catchError(err => of(new UserUpdateFaild({ err })))
          )
        )
      );


    constructor(private actions$: Actions, private constraintService$: ConstraintsService, public store: Store<State>) {
    }

}
