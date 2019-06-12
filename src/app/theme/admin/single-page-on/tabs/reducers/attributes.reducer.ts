
import { AttributesActions, AttributesActionTypes } from '../actions/attributes.actions';

export interface AttrState {
    listAttr?: any;
    listAttrFormList?: any;
    listAttrIsTableShow?: any;
}

export const initialState: AttrState = {

};

export function AttrReducer(state = initialState, action: AttributesActions): AttrState {
  switch (action.type) {

      case AttributesActionTypes.LoadAttributessSuccess:
          return {
              ...state,
              listAttr: action.payload.data
          };

      case AttributesActionTypes.LoadAttributesFormListSuccess:
          return {
              ...state,
              listAttrFormList: action.payload.data
          };

    default:
      return state;
  }
}
