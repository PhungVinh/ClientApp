import { Action } from '@ngrx/store';
import {EncodeActions} from '../actions/encode.actions';


export interface EncodeState {
  encodes?: any;
  err?: any;
}

export const initialState: EncodeState = {

};

export function encodeReducer(state = initialState, action: EncodeActions): EncodeState {
  switch (action.type) {

    default:
      return state;
  }
}
