import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {concatMap, exhaustMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {ModuleActionTypes, ModuleActions, LoadModules, LoadModulesSuccess} from '../actions/module.actions';
import {map} from 'rxjs/internal/operators';
import {ModuleService} from '../services/module/module.service';


@Injectable()
export class ModuleEffects {


  @Effect()
  loadModules$ = this.actions$.pipe(
    ofType(ModuleActionTypes.LoadModules),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
      exhaustMap((action: LoadModules) =>
          this.moduleService.getAllModule().pipe(
              map(data => new LoadModulesSuccess({listModule: data})),
              // catchError(err => of(new LoadOrganizationsFaild({ err })))
          )
      )
  );


  constructor(private actions$: Actions<ModuleActions>, private moduleService: ModuleService) {}

}
