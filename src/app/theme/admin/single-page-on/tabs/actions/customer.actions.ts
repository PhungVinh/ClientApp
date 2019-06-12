import { Action } from '@ngrx/store';
import { Pagination } from 'src/app/shared/model/pagination.model';

export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load Success Customers',
  LoadCustomersFailed = '[Customer] Load Failded Customers',
  CreateCustomer = '[Customer] Create Customer',
  CreateCustomerSuccess = '[Customer] Create Success Customer',
  CreateCustomerFaild = '[Customer] Create Failded Customer',
  LoadCims = '[Customer] Load LoadCims',
  LoadCimsSuccess = '[Customer] Load Success LoadCims',
  LoadCimsFailed = '[Customer] Load Failed LoadCims',
  LoadAttribute = '[Customer] Load Attribute',
  LoadAttributeSuccess = '[Customer] Load Attribute Success',
  LoadAttributeFailed = '[Customer] Load Attribute Failed',
  LoadFormConfiguration = '[Customer] Load form configuration',
  LoadFormConfigurationSuccess = '[Customer] Load form configuration success',
  LoadFormConfigurationFailed = '[Customer] Load form configuration failed',
  UpdateCustomer = '[Customer] Update Customer',
  UpdateCustomerSuccess = '[Customer] Update Success Customer',
  UpdateCustomerFaild = '[Customer] Update Failded Customer',
  LoadDetailCims = '[Customer] Load LoadDetailCims',
  LoadDetailCimsSuccess = '[Customer] Load Success LoadDetailCims',
  LoadDetailCimsFailed = '[Customer] Load Failed LoadDetailCims',
  DeleteCustomer = '[Customer] Delete Customer',
  DeleteCustomerSuccess = '[Customer] Delete Success Customer',
  DeleteCustomerFaild = '[Customer] Delete Failded Customer',
}

/**
 * Action load customer data with pagination
 * @param payload pagination detail
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadCims implements Action {
  readonly type = CustomerActionTypes.LoadCims;
  constructor(readonly payload: { pagination: Pagination }) { }
}

/**
 * Action to handle load customer data with pagination success
 * @param payload data pass from action load customer data
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadCimsSuccess implements Action {
  readonly type = CustomerActionTypes.LoadCimsSuccess;
  constructor(readonly payload: { data: any }) { }
}

/**
 * Action to handle load customer data with pagination failed
 * @param payload error pass from action load customer data
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadCimsFailed implements Action {
  readonly type = CustomerActionTypes.LoadCimsFailed;
  constructor(readonly payload: { error: any }) { }
}

/**
 * Action load customer data with pagination
 * @param payload pagination detail
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadDetailCims implements Action {
  readonly type = CustomerActionTypes.LoadDetailCims;
  constructor(readonly payload: { RecordId: string }) { }
}

/**
 * Action to handle load customer data with pagination success
 * @param payload data pass from action load customer data
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadDetailCimsSuccess implements Action {
  readonly type = CustomerActionTypes.LoadDetailCimsSuccess;
  constructor(readonly payload: { data: any }) { }
}

/**
 * Action to handle load customer data with pagination failed
 * @param payload error pass from action load customer data
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadDetailCimsFailed implements Action {
  readonly type = CustomerActionTypes.LoadDetailCimsFailed;
  constructor(readonly payload: { error: any }) { }
}

/**
 * Action load form configuration
 * @param payload child code of form
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadFormConfiguration implements Action {
  readonly type = CustomerActionTypes.LoadFormConfiguration;
  constructor(readonly payload: { ChildCode: any }) { }
}

/**
 * Action to handle load form configuration success
 * @param payload data pass from action load form configuration
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadFormConfigurationSuccess implements Action {
  readonly type = CustomerActionTypes.LoadFormConfigurationSuccess;
  constructor(readonly payload: { response: any[] }) { }
}

/**
 * Action to handle load form configuration failed
 * @param payload error pass from action load form configuration
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadFormConfigurationFailed implements Action {
  readonly type = CustomerActionTypes.LoadFormConfigurationFailed;
  constructor(readonly payload: { error: any }) { }
}

/**
 * Action load attributes by form id
 * @param payload id of form
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadAttribute implements Action {
  readonly type = CustomerActionTypes.LoadAttribute;
  constructor(readonly payload: { formId: any }) { }
}

/**
 * Action to handle load attributes by form id success
 * @param payload data pass from action load attributes by form id
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadAttributeSuccess implements Action {
  readonly type = CustomerActionTypes.LoadAttributeSuccess;
  constructor(readonly payload: { response: any[] }) { }
}

/**
 * Action to handle load attributes by form id failed
 * @param payload error pass from action load attributes by form id
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class LoadAttributeFailed implements Action {
  readonly type = CustomerActionTypes.LoadAttributeFailed;
  constructor(readonly payload: { error: any }) { }
}

/**
 * Action create customer
 * @param payload customer detail to create
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class CreateCustomer implements Action {
  readonly type = CustomerActionTypes.CreateCustomer;
  constructor(public payload: { customer: any }) { }
}


/**
 * Action to handle create customer success
 * @param payload data pass from action create customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class CreateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.CreateCustomerSuccess;
  constructor(public payload: { data: boolean }) { }
}

/**
 * Action to handle create customer failed
 * @param payload error pass from action create customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class CreateCustomerFaild implements Action {
  readonly type = CustomerActionTypes.CreateCustomerFaild;
  constructor(public payload: { err: any }) { }
}

/**
 * Action update customer
 * @param payload customer detail to update
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UpdateCustomer;
  constructor(public payload: { customer: any }) { }
}

/**
 * Action to handle update customer success
 * @param payload data pass from action update customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class UpdateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerSuccess;
  constructor(public payload: { data: boolean }) { }
}

/**
 * Action to handle update customer failed
 * @param payload error pass from action update customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class UpdateCustomerFaild implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerFaild;
  constructor(public payload: { err: any }) { }
}

/**
 * Action delete customer
 * @param payload customer id detail to delete
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DeleteCustomer;
  constructor(public payload: { customerId: any }) { }
}

/**
 * Action to handle delete customer success
 * @param payload data pass from action delete customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerSuccess;
  constructor(public payload: { data: boolean }) { }
}

/**
 * Action to handle delete customer failed
 * @param payload error pass from action delete customer
 * @author daibh
 * @readonly do not change this action. please contact with author before implement code
 */
export class DeleteCustomerFaild implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerFaild;
  constructor(public payload: { err: any }) { }
}

export type CustomerActions =
  | LoadAttribute
  | LoadAttributeSuccess
  | LoadAttributeFailed
  | LoadCims
  | LoadCimsSuccess
  | LoadCimsFailed
  | LoadFormConfiguration
  | LoadFormConfigurationSuccess
  | LoadFormConfigurationFailed
  | LoadDetailCims
  | LoadDetailCimsSuccess
  | LoadDetailCimsFailed
  | CreateCustomer
  | CreateCustomerSuccess
  | CreateCustomerFaild
  | UpdateCustomer
  | UpdateCustomerSuccess
  | UpdateCustomerFaild
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFaild
  ;