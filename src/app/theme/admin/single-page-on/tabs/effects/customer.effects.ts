import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { CreateCustomerFaild, CreateCustomerSuccess, CustomerActions, CustomerActionTypes, DeleteCustomerFaild, DeleteCustomerSuccess, LoadAttributeFailed, LoadAttributeSuccess, LoadCimsFailed, LoadCimsSuccess, LoadDetailCimsFailed, LoadDetailCimsSuccess, LoadFormConfigurationFailed, LoadFormConfigurationSuccess, UpdateCustomerFaild, UpdateCustomerSuccess } from '../actions/customer.actions';
import { CimsService } from '../services/cims/cims.service';

@Injectable()
export class CustomerEffects {

  /**
   * Effect of dispatch action LoadAttribute.
   * Dependence include actions: LoadAttributeSuccess, LoadAttributeFailed.
   * LoadAttributeSuccess was be dispatched when LoadAttribute service occurs successfully
   * LoadAttributeFailed was be catched when LoadAttribute service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  loadAttributes$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadAttribute),
    switchMap((action) => this.service$.fetch({ formId: action.payload.formId }).pipe(
      map(response => new LoadAttributeSuccess({ response })),
      catchError(error => of(new LoadAttributeFailed({ error })))
    ))
  );

  /**
   * Effect of dispatch action LoadFormConfiguration.
   * Dependence include actions: LoadFormConfigurationSuccess, LoadFormConfigurationFailed.
   * LoadFormConfigurationSuccess was be dispatched when LoadFormConfiguration service occurs successfully
   * LoadFormConfigurationFailed was be catched when LoadFormConfiguration service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  loadFormConfiguration$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadFormConfiguration),
    switchMap((action) => this.service$.fetchFormConfig(action.payload.ChildCode).pipe(
      map(response => new LoadFormConfigurationSuccess({ response })),
      catchError(error => of(new LoadFormConfigurationFailed({ error })))
    ))
  )

  /**
   * Effect of dispatch action LoadCims.
   * Dependence include actions: LoadCimsSuccess, LoadCimsFailed.
   * LoadCimsSuccess was be dispatched when LoadCims service occurs successfully
   * LoadCimsFailed was be catched when LoadCims service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  loadCims$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadCims),
    switchMap(action => this.service$.fetchCims({ pagination: action.payload.pagination }).pipe(
      map(data => new LoadCimsSuccess({ data })),
      catchError(error => of(new LoadCimsFailed({ error })))
    ))
  );

  /**
   * Effect of dispatch action LoadDetailCims.
   * Dependence include actions: LoadDetailCimsSuccess, LoadDetailCimsFailed.
   * LoadDetailCimsSuccess was be dispatched when LoadDetailCims service occurs successfully
   * LoadDetailCimsFailed was be catched when LoadDetailCims service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  loadDetailCims$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadDetailCims),
    switchMap(action => this.service$.fetchDetailCims({ RecordId: action.payload.RecordId }).pipe(
      map(data =>
        new LoadDetailCimsSuccess({ data })
      ),
      catchError(error => of(new LoadDetailCimsFailed
        ({ error })))
    ))
  );

  /**
   * Effect of dispatch action CreateCustomer.
   * Dependence include actions: CreateCustomerSuccess, CreateCustomerFaild.
   * CreateCustomerSuccess was be dispatched when CreateCustomer service occurs successfully
   * CreateCustomerFaild was be catched when CreateCustomer service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  createCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.CreateCustomer),
    switchMap(action =>
      this.service$.create(action.payload.customer).pipe(
        map(data => new CreateCustomerSuccess({ data: true })),
        catchError(err => of(new CreateCustomerFaild({ err })))
      )
    )
  );

  /**
   * Effect of dispatch action UpdateCustomer.
   * Dependence include actions: UpdateCustomerSuccess, UpdateCustomerFaild.
   * UpdateCustomerSuccess was be dispatched when UpdateCustomer service occurs successfully
   * UpdateCustomerFaild was be catched when UpdateCustomer service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  updateCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.UpdateCustomer),
    exhaustMap(action =>
      this.service$.update(action.payload.customer).pipe(
        map(data => new UpdateCustomerSuccess({ data: true })),
        catchError(err => of(new UpdateCustomerFaild({ err })))
      )
    )
  );

  /**
   * Effect of dispatch action DeleteCustomer.
   * Dependence include actions: DeleteCustomerSuccess, DeleteCustomerFaild.
   * DeleteCustomerSuccess was be dispatched when DeleteCustomer service occurs successfully
   * DeleteCustomerFaild was be catched when DeleteCustomer service occurs failed
   * @author daibh
   * @readonly do not change this action. please contact with author before implement code
   */
  @Effect()
  deleteCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.DeleteCustomer),
    exhaustMap(action =>
      this.service$.delete(action.payload.customerId).pipe(
        map(data => new DeleteCustomerSuccess({ data: true })),
        catchError(err => of(new DeleteCustomerFaild({ err })))
      )
    )
  );

  constructor(
    private actions$: Actions<CustomerActions>,
    private service$: CimsService
  ) { }

}
