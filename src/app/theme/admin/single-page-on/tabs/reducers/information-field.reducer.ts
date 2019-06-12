
import { InformationFieldActions, InformationFieldActionTypes } from '../actions/information-field.actions';

export interface ConsState {
    id?: any;
    listcate?: any[];
    listcateChild?: any[];
    formConfig?: any;
}

export const initialState: ConsState = {

};

export function inforFieldReducer(state = initialState, action: InformationFieldActions): ConsState {
  switch (action.type) {

      // case InformationFieldActionTypes.LoadInformationFields:
      // return state;

      case InformationFieldActionTypes.LoadInformationFieldsSuccess:
          return {
              ...state,
              formConfig: action.payload.formConfig
          };

      case InformationFieldActionTypes.LoadConstraints:
          return state;
      case InformationFieldActionTypes.LoadConstraintsSuccess:
          return {
              ...state,
              id: action.payload.listConstraints
          };
      case InformationFieldActionTypes.LoadCategoryLink:
          return state;
      case InformationFieldActionTypes.LoadCategoryLinkSuccess:
          return {
              ...state,
              listcate: action.payload.listCate
          };
      case InformationFieldActionTypes.LoadCategoryChildLink:
          return state;
      case InformationFieldActionTypes.LoadCategoryChildLinkSuccess:
          return {
              ...state,
              listcateChild: action.payload.listCateChild
          };

      case InformationFieldActionTypes.UpdateInformationField:
          return state;
      case InformationFieldActionTypes.UpdateInformationFieldSuccess:
          return {
              ...state,
          };

    default:
      return state;
  }
}
