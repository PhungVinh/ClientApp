import { Action } from '@ngrx/store';

export enum EncryptionActionTypes {
  LoadEncryptions = '[Encryption] Load Encryptions',
  LoadFieldEncryptions = '[Encryption] Load Field Encryptions',
  LoadFieldEncryptionsSuccess = '[Encryption] Load Field Encryptions Success',
  LoadFieldEncryptionsFailed = '[Encryption] Load Field Encryptions Failed',
  LoadModuledEncryptions = '[Encryption] Load Module Encryptions',
  LoadModuledEncryptionsSuccess = '[Encryption] Load Module Encryptions Success',
  LoadModuledEncryptionsFaild = '[Encryption] Load Module Encryptions Faild',
  LoadFieldByModuledEncryptions = '[Encryption] Load Field By Module Encryptions',
  LoadFieldByModuledEncryptionsSuccess = '[Encryption] Load Field By Module Encryptions Success',
  LoadFieldByModuledEncryptionsFaild = '[Encryption] Load Field By Module Encryptions Faild',
  UpdateEncryption = '[Encryption] Update encryption',
  UpdateEncryptionSuccess = '[Encryption] Update encryption Success',
  UpdateEncryptionFaild = '[Encryption] Update encryption faild',
}

export class LoadEncryptions implements Action {
  readonly type = EncryptionActionTypes.LoadEncryptions;
}

// export class LoadFieldEncryptions implements Action {
//   readonly type = EncryptionActionTypes.LoadFieldEncryptions;
//   constructor(readonly payload: { moduleEncryption: string }) { }
// }

export class LoadFieldEncryptions implements Action {
    readonly type = EncryptionActionTypes.LoadFieldEncryptions;
    constructor(readonly payload: any) { }
}

export class LoadFieldEncryptionsSuccess implements Action {
  readonly type = EncryptionActionTypes.LoadFieldEncryptionsSuccess;
  constructor(readonly payload: { res: any }) { }
}

export class LoadFieldEncryptionsFailed implements Action {
  readonly type = EncryptionActionTypes.LoadFieldEncryptionsFailed;
  constructor(readonly payload: { err?: any }) { }
}

export class LoadModuledEncryptions implements Action {
    readonly type = EncryptionActionTypes.LoadModuledEncryptions;
    constructor() { }
}

export class LoadModuledEncryptionsSuccess implements Action {
    readonly type = EncryptionActionTypes.LoadModuledEncryptionsSuccess;
    constructor(readonly payload: { data: any }) { }
}

export class LoadModuledEncryptionsFaild implements Action {
    readonly type = EncryptionActionTypes.LoadModuledEncryptionsFaild;
    constructor(readonly payload: { err?: any }) { }
}
export class LoadFieldByModuledEncryptions implements Action {
    readonly type = EncryptionActionTypes.LoadFieldByModuledEncryptions;
    constructor(readonly payload: any) { }
}

export class LoadFieldByModuledEncryptionsSuccess implements Action {
    readonly type = EncryptionActionTypes.LoadFieldByModuledEncryptionsSuccess;
    constructor(readonly payload: { data: any}) { }
}

export class LoadFieldByModuledEncryptionsFaild implements Action {
    readonly type = EncryptionActionTypes.LoadFieldByModuledEncryptionsFaild;
    constructor(readonly payload: { err?: any }) { }
}

export class UpdateEncryption implements Action {
    readonly type = EncryptionActionTypes.UpdateEncryption;
    constructor(readonly payload: any) { }
}

export class UpdateEncryptionSuccess implements Action {
    readonly type = EncryptionActionTypes.UpdateEncryptionSuccess;
    constructor(readonly payload: { data: any}) { }
}

export class UpdateEncryptionFaild implements Action {
    readonly type = EncryptionActionTypes.UpdateEncryptionFaild;
    constructor(readonly payload: { err?: any }) { }
}

export type EncryptionActions =
| LoadEncryptions
| LoadFieldEncryptions
| LoadFieldEncryptionsSuccess
| LoadFieldEncryptionsFailed
| LoadModuledEncryptions
| LoadModuledEncryptionsSuccess
| LoadModuledEncryptionsFaild
| LoadFieldByModuledEncryptions
| LoadFieldByModuledEncryptionsSuccess
| LoadFieldByModuledEncryptionsFaild
| UpdateEncryption
| UpdateEncryptionSuccess
| UpdateEncryptionFaild;
