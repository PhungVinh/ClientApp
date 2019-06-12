import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectEncryptionFields = createSelector(
  selectAdmin,
  (state: AdminState, param: { module: string }) => module ? state.encryption.module[param.module] : undefined
);

export const selectEncryptionFieldsSuccess = createSelector(
    selectAdmin,
    (state: AdminState) => state.encryption.encryptions
);

export const selectEncryptionModuleSuccess = createSelector(
    selectAdmin,
    (state: AdminState) => state.encryption.encryptionsModule
);

export const selectEncryptionFielModuleSuccess = createSelector(
    selectAdmin,
    (state: AdminState) => state.encryption.fieldByModule
);

export const selectEncryptionUpdateSuccess = createSelector(
    selectAdmin,
    (state: AdminState) => state.encryption.updateEncryption
);
