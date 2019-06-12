import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {exhaustMap} from 'rxjs/operators';
import {
    AttributesActionTypes,
    AttributesActions,
    LoadAttributess,
    LoadAttributessSuccess,
    LoadAttributesFormList, LoadAttributesFormListSuccess
} from '../actions/attributes.actions';
import {map} from 'rxjs/internal/operators';
import {AttributeService} from '../services/attribute/attribute.service';
import {FormConfigService} from '../services/form-config/form-config.service';


@Injectable()
export class AttributesEffects {


  @Effect()
  loadAttributess$ = this.actions$.pipe(
    ofType(AttributesActionTypes.LoadAttributess),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
      exhaustMap((action: LoadAttributess) =>
          this.attrService$.getAllAttributes().pipe(
              map(data => new LoadAttributessSuccess({data: data})),
          )
      )
  );

    @Effect()
    loadAttributesFormList$ = this.actions$.pipe(
        ofType(AttributesActionTypes.LoadAttributesFormList),
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        exhaustMap((action: LoadAttributesFormList) =>
            this.formConfig$.getFormList().pipe(
                map(data => new LoadAttributesFormListSuccess({data: data})),
            )
        )
    );


  constructor(private actions$: Actions<AttributesActions>, private attrService$: AttributeService, private formConfig$: FormConfigService) {}

}
