import { Action } from '@ngrx/store';

export enum ModuleActionTypes {
  LoadModules = '[Module] Load Modules',
  LoadModulesSuccess = '[Module] Load Modules Success',
}

export class LoadModules implements Action {
  readonly type = ModuleActionTypes.LoadModules;
}

export class LoadModulesSuccess implements Action {
    readonly type = ModuleActionTypes.LoadModulesSuccess;
    constructor(public payload: { listModule: any[] }) {

    }
}


export type ModuleActions = LoadModules | LoadModulesSuccess;
