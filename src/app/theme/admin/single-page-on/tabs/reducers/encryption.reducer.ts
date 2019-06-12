
import {
    EncryptionActions,
    EncryptionActionTypes,
    LoadFieldEncryptionsFailed,
    LoadFieldEncryptionsSuccess
} from '../actions/encryption.actions';

export interface EncryptionState {
  module?: any;
  encryptions?: any;
  err?: any;
  encryptionsModule?: any;
  fieldByModule?: any;
  errFileByModule?: any;
    updateEncryption?: any;
    paramCode?: any;
}

export const initialState: EncryptionState = {
  module: {
    organization: undefined
  }
};

export function encryptionReducer(state = initialState, action: EncryptionActions): EncryptionState {
  switch (action.type) {

    case EncryptionActionTypes.LoadFieldEncryptions:
      return { ...state,
          encryptions: null,
          err: null
      };

    case EncryptionActionTypes.LoadFieldEncryptionsSuccess:
      return { ...state,
          encryptions: action.payload.res,
      };

    case EncryptionActionTypes.LoadFieldEncryptionsFailed:
      return { ...state,
          err: action.payload.err
      };

    case EncryptionActionTypes.LoadModuledEncryptions:
      return { ...state,
        encryptionsModule: null,
        err: null,
        fieldByModule: null
      };


  case EncryptionActionTypes.LoadModuledEncryptionsSuccess:
      return { ...state,
          encryptionsModule: action.payload.data,
      };


  case EncryptionActionTypes.LoadModuledEncryptionsFaild:
      return { ...state,
          err: action.payload.err
      };
  case EncryptionActionTypes.LoadFieldByModuledEncryptions:
      return { ...state,
          fieldByModule: null,
          errFileByModule: null,
          paramCode: action.payload
      };

  case EncryptionActionTypes.LoadFieldByModuledEncryptionsSuccess:
      return { ...state,
          fieldByModule: action.payload.data,
      };

  case EncryptionActionTypes.LoadFieldByModuledEncryptionsFaild:
      return { ...state,
          errFileByModule: action.payload.err
      };
  case EncryptionActionTypes.UpdateEncryption:
      return { ...state,
          updateEncryption: null
      };
  case EncryptionActionTypes.UpdateEncryptionSuccess:
      return { ...state,
          updateEncryption: action.payload.data
      };
  case EncryptionActionTypes.UpdateEncryptionFaild:
      return { ...state,
          err: action.payload.err
      };

    default:
      return { ...state };
  }
}
