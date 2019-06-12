import { Action } from '@ngrx/store';

export enum EncodeActionTypes {
  LoadEncodes = '[Encode] Load Encodes',
  LoadEncodesSuccess = '[Encode] Load Encodes success',
  LoadEncodesFaild = '[Encode] Load Encodes faild',
}

export class LoadEncodes implements Action {
  readonly type = EncodeActionTypes.LoadEncodes;
    constructor(readonly payload: {code: string}) {}
}

export class LoadEncodesSuccess implements Action {
    readonly type = EncodeActionTypes.LoadEncodesSuccess;
    constructor(readonly payload: any[]) {}
}

export class LoadEncodesFaild implements Action {
    readonly type = EncodeActionTypes.LoadEncodesFaild;
    constructor(readonly err: any) {}
}


export type EncodeActions = LoadEncodes
    | LoadEncodesSuccess
    | LoadEncodesFaild;
