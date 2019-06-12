import { Action } from '@ngrx/store';
import {ProfileActions, ProfileActionTypes} from "../actions/profile.actions";


export interface ProfileState {
  load?: any;
    err?: any;
    errProfile?: any;
    loadProfile?: any;
    linkImage?: any;
}

export const initialState: ProfileState = {
};

export function profileReducer(state = initialState, action: ProfileActions): ProfileState {
  switch (action.type) {
      case ProfileActionTypes.UploadFileProfiles :
        return {
            ...state
        };
      case ProfileActionTypes.UploadFileProfilesSuccess:
        return {
            ...state,
            load: action.payload.load
        };
      case ProfileActionTypes.UploadFileProfilesFaild:
        return {
            ...state,
            err: action.payload.err
        };
      case ProfileActionTypes.ProfilesUpdate:
          return{
              ...state,
              load: null,
              errProfile: null
          };
      case ProfileActionTypes.ProfilesUpdateSuccess:
          return{
              ...state,
              loadProfile: action.payload.load
          };
      case ProfileActionTypes.ProfilesUpdateFaild:
          return{
              ...state,
              errProfile: action.payload.err
          };
      case ProfileActionTypes.GetImageProfiles:
          return{
              ...state,
              linkImage: action.payload.link
          };
    default:
      return state;
  }
}
