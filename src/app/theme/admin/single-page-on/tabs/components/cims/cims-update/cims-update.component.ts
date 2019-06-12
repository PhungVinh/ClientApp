import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { firstOrDefault, isDefined, isDefinedProp } from 'src/app/shared/util/common.util';
import { State } from '../../../../../admin.state';
import { CreateCustomer, CustomerActionTypes, LoadCims, LoadDetailCims, LoadFormConfiguration, UpdateCustomer } from '../../../actions/customer.actions';
import { selectFormConfiguration, selectFormConfigurationData } from '../../../selectors/customer.selectors';

@Component({
  selector: 'app-cims-update',
  templateUrl: './cims-update.component.html',
  styleUrls: ['./cims-update.component.scss']
})
export class CimsUpdateComponent implements OnInit, OnDestroy {
  myFormGroup: FormGroup;

  public recordId?: string;
  attribute$: Observable<any>;
  attribute: any;
  customer: any;
  ChildCode = 'CIMS_ADD';
  isSaving = false;
  isContinue = false;
  subscription: Subject<void> = new Subject();
  dataSubscription: Subject<void> = new Subject();
  trackAction = [
    CustomerActionTypes.CreateCustomerSuccess,
    CustomerActionTypes.CreateCustomerFaild,
    CustomerActionTypes.UpdateCustomerSuccess,
    CustomerActionTypes.UpdateCustomerFaild,
    CustomerActionTypes.LoadCimsSuccess,
    CustomerActionTypes.LoadCimsFailed,
    CustomerActionTypes.LoadDetailCimsSuccess,
    CustomerActionTypes.LoadDetailCimsFailed,
    CustomerActionTypes.LoadFormConfigurationFailed,
    CustomerActionTypes.LoadFormConfigurationSuccess
  ];

  @ViewChild('editCustomerForm') editCustomerForm: NgForm;
  @ViewChild('elRefForm') elRefForm: ElementRef;
  constructor(
    private store: Store<State>,
    public activeModal: NgbActiveModal,
    private actionsSubject$: ActionsSubject
  ) {
    // track for save action status
    this.actionsSubject$.pipe(
      takeUntil(this.subscription), // only hold on subscrible when subscription alive
      filter((action) => this.trackAction.some(a => a === action.type))
    ).subscribe((action) => {
      switch (action.type) {
        case CustomerActionTypes.CreateCustomerSuccess:
        case CustomerActionTypes.UpdateCustomerSuccess:
          if (isDefinedProp(action, 'payload')) { // case success action have data in payload
            // do something
          }
          // reload data from list screen
          this.store.dispatch(new LoadCims({ pagination: { currPage: 1, recodperpage: ITEMS_PER_PAGE } }));
          break;
        case CustomerActionTypes.CreateCustomerFaild:
        case CustomerActionTypes.UpdateCustomerFaild:
          if (isDefinedProp(action, 'payload')) { // case error action have error data in payload
            // handle rise error return by service
            if (isDefined(action['payload'].err) && action['payload'].err instanceof HttpErrorResponse) {
              // get error header from error response
              const error = (<HttpErrorResponse>action['payload'].err).error;
              if (isDefined(error)) {
                // determine focus errors control occurs
                const focusError = firstOrDefault(error, null);
                if (isDefinedProp(focusError, 'message')) {
                  switch (focusError['message']) {
                    case 'NotNull': // handle errors with type not null
                      if (isDefined(this.editCustomerForm) && isDefined(this.editCustomerForm.controls) && isDefined(this.editCustomerForm.controls[focusError.field])) {
                        // set error to update status of error FormControl
                        this.editCustomerForm.controls[focusError.field].setErrors({ required: true });
                        // set focus to error FormControl
                        setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[ng-reflect-name=${focusError.field}]`)).focus(), 0)
                      }
                      break;
                    case 'NotDuplicate': // handle errors with type not unique
                      if (isDefined(this.editCustomerForm) && isDefined(this.editCustomerForm.controls) && isDefined(this.editCustomerForm.controls[focusError.field])) {
                        this.editCustomerForm.controls[focusError.field].setErrors({ notUnique: true });
                        setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[ng-reflect-name=${focusError.field}]`)).focus(), 0)
                      }
                      break;
                  }
                }
              }
            }
          }
          // do something
          break;
        case CustomerActionTypes.LoadFormConfigurationSuccess:
          // after load configuration form success
          // do dispatch action to load customer detail to update
          if (this.recordId) {
            // dispatch load detail customer
            this.store.dispatch(new LoadDetailCims({ RecordId: this.recordId }));
          } else {
            this.destroyInitSubscription();
          }
          break;
        case CustomerActionTypes.LoadDetailCimsSuccess:
          // merge data for update case
          // subscription get form data
          this.store.pipe(select(selectFormConfigurationData))
            .pipe(takeUntil(this.dataSubscription)) // only hold on subscrible when subscription alive
            .subscribe(cus => {
              if (cus && this.attribute) {
                this.customer = Object.assign({}, cus);
                const lstKey = Object.keys(this.customer);
                (<any[]>this.attribute).forEach(row => (<any[]>row.children).forEach(attr => {
                  if (lstKey.some(k => k === attr.AttributeCode)) {
                    switch (attr.AttributeType) {
                      case 'TEXTBOX':
                      case 'TEXTAREA':
                        attr.DefaultValueWithTextBox = this.customer[attr.AttributeCode];
                        break;
                      default:
                        attr.DefaultValue = this.customer[attr.AttributeCode];
                        break;
                    }
                  }
                }));
                this.destroyInitSubscription();
              }
            }, err => { // untrack subscription
              this.destroyInitSubscription();
              this.clear();
            });
          break;
        case CustomerActionTypes.LoadCimsSuccess:
          if (!this.isContinue) { // close modal after refresh data
            this.clear();
          }
          break;
        case CustomerActionTypes.LoadCimsFailed:
        case CustomerActionTypes.LoadDetailCimsFailed:
        case CustomerActionTypes.LoadFormConfigurationFailed:
          if (!this.isContinue) { // close modal after refresh data
            this.clear();
          }
          break;
      }
    });

  }

  /**
   * process loading data and configuration to initial and render component
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  ngOnInit() {
    this.store.pipe(select(selectFormConfiguration))
      .pipe(takeUntil(this.dataSubscription)) // only hold on subscrible when subscription alive
      .subscribe(attribute => {
        if (attribute && (<[]>attribute).length) {
          this.attribute = JSON.parse(JSON.stringify(attribute));
        }
      }, err => { // untrack subscription
        this.destroyInitSubscription();
        this.clear();
      });
    // dispatch load form config
    this.store.dispatch(new LoadFormConfiguration({ ChildCode: this.ChildCode }));
  }

  /**
   * destroy all subscription of initial data to init and render component
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  destroyInitSubscription = () => {
    this.dataSubscription.next();
    this.dataSubscription.complete();
  }

  /**
   * process form submit to save new or update customer
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onSubmit = () => {
    const obj = {};
    let lstObject = [];
    const ctrls = this.editCustomerForm.control.controls;
    if (this.editCustomerForm && this.editCustomerForm.valid) { // only process data when form was valid
      // get data input from form
      Object.keys(ctrls).forEach(key => { // browser controls to clone current data of form to new form data object
        obj[key] = ctrls[key].value;
        let objCustomer = {
          ChildCode: this.ChildCode,
          AttributeValue: obj[key],
          AttributeCode: key
        };
        lstObject.push(objCustomer);
      });
      if (this.recordId) { // case update then push record id to form data
        lstObject.push({
          ChildCode: this.ChildCode,
          AttributeValue: this.recordId,
          AttributeCode: 'RecordId'
        });
        // dispatch update customer
        this.store.dispatch(new UpdateCustomer({ customer: lstObject }));
      } else {
        // dispatch create customer
        this.store.dispatch(new CreateCustomer({ customer: lstObject }));
      }
    } else {
      // set focus to first error control
      const firstErrorKey = Object.keys(this.editCustomerForm.controls).find(k => isDefined(this.editCustomerForm.controls[k]) && this.editCustomerForm.controls[k].invalid);
      setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[ng-reflect-name=${firstErrorKey}]`)).focus(), 0);
    }
  }

  /**
   * handle event when clicked on save button
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onSave = $event => {
    $event.preventDefault();
    this.isContinue = false;
    this.onSubmit();
  }

  /**
   * handle event when clicked on save and continue button
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onSaveAnContinue = $event => {
    $event.preventDefault();
    this.isContinue = true;
    this.onSubmit();
  }

  /**
   * handle event when click on close modal button
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  clear = () => {
    this.activeModal.close('close');
  }

  /**
   * process tracking status of controls
   * @param ctrl control name
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  isShowInvalid = ctrl => {
    if (isDefined(this.editCustomerForm) && isDefined(this.editCustomerForm.controls) && isDefined(this.editCustomerForm.controls[ctrl])) {
      return (this.editCustomerForm.submitted || this.editCustomerForm.controls[ctrl].touched || this.editCustomerForm.controls[ctrl].dirty) && this.editCustomerForm.controls[ctrl].invalid;
    }
    return false;
  }

  /**
   * process tracking special error status of controls
   * @param ctrl control name
   * @param type type of error ig: required, minlength, maxlength, notUnique,...
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  isShowError = (ctrl: string, type: string) => {
    return isDefined(this.editCustomerForm) && isDefined(this.editCustomerForm.controls) && isDefined(this.editCustomerForm.controls[ctrl]) && this.editCustomerForm.controls[ctrl].errors && this.editCustomerForm.controls[ctrl].errors[type];
  };

  /**
   * handle event when check/uncheck on list checkbox control
   * @param event change event was being inject be angular
   * @param newVal value of checkbox was changed status
   * @param origin current checked values of list checkbox was joined by a seperater
   * @param seperate character was determine to seperate values selected of list checkbox
   * @returns values of list checkbox was joined by a seperater
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  updateSelectedListCheckbox = (event: Event, newVal: string, origin?: string, seperate?: string) => {
    const target = <HTMLInputElement>event.target;
    seperate = seperate || ',';
    const oriArray = origin ? origin.split(seperate) : [];
    const find = oriArray.findIndex(i => i.trim() === newVal);
    if (find !== -1 && !target.checked) {
      oriArray.splice(find, 1);
    }
    if (find === -1 && target.checked) {
      oriArray.push(newVal);
    }
    return oriArray.join(seperate);
  }

  /**
   * process check/uncheck of special control in list checkbox control
   * @param value value of checkbox was checking status
   * @param origin current checked values of list checkbox was joined by a seperater
   * @param seperate character was determine to seperate values selected of list checkbox
   * @returns value has existed in values of list checkbox was joined by a seperater
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  isBufferredContain = (value: string, origin?: string, seperate?: string) => {
    seperate = seperate || ',';
    const oriArray = origin ? origin.split(seperate) : [];
    return oriArray.some(i => i.trim() === value);
  }

  /**
   * handle when component destroying
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
