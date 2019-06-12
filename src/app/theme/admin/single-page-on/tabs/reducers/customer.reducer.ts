
import { CustomerActions, CustomerActionTypes } from '../actions/customer.actions';

/**
 * Interface bind model state for customer
 */
export interface CustomerState {
  customers?: any[];
  data?: any;
  attributes?: any[];
  formAttributes?: any[];
  error?: any
  customer?: any;
  load?: boolean;
}

/**
 * initial state for customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export const initialState: CustomerState = {
  customers: []
};

/**
 * process browsing action was be dispatching
 * @param state current state
 * @param action current action browsing
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code 
 */
export function customerReducer(state = initialState, action: CustomerActions): CustomerState {
  // seperate action type to reducer special action
  switch (action.type) {
    case CustomerActionTypes.LoadCims:
      return { ...state };

    case CustomerActionTypes.LoadCimsSuccess:
      return { ...state, data: action.payload.data };

    case CustomerActionTypes.LoadCimsFailed:
      return { ...state, error: action.payload.error };

    case CustomerActionTypes.LoadDetailCims:
      return { ...state, customer: null };

    case CustomerActionTypes.LoadDetailCimsSuccess:
      return { ...state, customer: action.payload.data };

    case CustomerActionTypes.LoadDetailCimsFailed:
      return { ...state, error: action.payload.error };

    case CustomerActionTypes.LoadAttribute:
      return { ...state, error: null };

    case CustomerActionTypes.LoadAttributeSuccess:
      return { ...state, attributes: action.payload.response };

    case CustomerActionTypes.LoadAttributeFailed:
      return { ...state, error: action.payload.error };

    case CustomerActionTypes.LoadFormConfiguration:
      return { ...state, error: null, formAttributes: null };

    case CustomerActionTypes.LoadFormConfigurationSuccess:
      return { ...state, formAttributes: action.payload.response };

    case CustomerActionTypes.LoadFormConfigurationFailed:
      return { ...state, error: action.payload.error };

    case CustomerActionTypes.CreateCustomer:
      return { ...state, load: true, error: null };

    case CustomerActionTypes.CreateCustomerSuccess:
      return { ...state, load: false };

    case CustomerActionTypes.CreateCustomerFaild:
      return { ...state, error: action.payload.err, load: false };

    case CustomerActionTypes.UpdateCustomer:
      return { ...state, load: true, error: null };

    case CustomerActionTypes.UpdateCustomerSuccess:
      return { ...state, load: false };

    case CustomerActionTypes.UpdateCustomerFaild:
      return { ...state, error: action.payload.err, load: false };

    case CustomerActionTypes.DeleteCustomer:
      return { ...state, load: true, error: null };

    case CustomerActionTypes.DeleteCustomerSuccess:
      return { ...state, load: false };

    case CustomerActionTypes.DeleteCustomerFaild:
      return { ...state, error: action.payload.err, load: false };

    default:
      return { ...state };
  }
}
