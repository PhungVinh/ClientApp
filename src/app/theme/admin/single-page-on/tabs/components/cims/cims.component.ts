import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { isDefinedProp } from 'src/app/shared/util/common.util';
import { State } from '../../../../admin.state';
import { CustomerActionTypes, DeleteCustomer, LoadCims } from '../../actions/customer.actions';
import { selectCustomerConfigurationColumn, selectCustomerConfigurationColumnData, selectCustomerConfigurationSearch, selectCustomerPagination } from '../../selectors/customer.selectors';
import { CimsImportComponent } from "./cims-import/cims-import.component";
import { CimsUpdateComponent } from './cims-update/cims-update.component';

@Component({
  selector: 'app-cims',
  templateUrl: './cims.component.html',
  styleUrls: ['./cims.component.scss']
})
export class CimsComponent implements OnInit {

  customerSearch$: Observable<any>;
  customerColumn$: Observable<any>;
  customerData$: Observable<any>;
  customerPagination$: Observable<any>;
  subscription: Subject<void> = new Subject();
  searchObj: any
  trackAction = [
    CustomerActionTypes.CreateCustomerSuccess,
    CustomerActionTypes.UpdateCustomerSuccess,
    CustomerActionTypes.DeleteCustomerSuccess
  ];

  @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
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
        case CustomerActionTypes.DeleteCustomerSuccess:
          if (isDefinedProp(action, 'payload')) { // case success action have data in payload
            // do something
          }
          // reload data from list screen
          this.store.dispatch(new LoadCims({ pagination: { currPage: 1, recodperpage: ITEMS_PER_PAGE } }));
          break;
      }
    });
  }

  ngOnInit() {
    this.customerSearch$ = this.store.pipe(select(selectCustomerConfigurationSearch));
    this.customerColumn$ = this.store.pipe(select(selectCustomerConfigurationColumn));
    this.customerData$ = this.store.pipe(select(selectCustomerConfigurationColumnData));
    this.customerPagination$ = this.store.pipe(select(selectCustomerPagination));
    this.store.dispatch(new LoadCims({ pagination: { currPage: 1, recodperpage: ITEMS_PER_PAGE } }));
  }

  /**
   * handle event when clicked on create button
   * @param {MouseEvent} $event event of mouse
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onCreate = $event => {
    $event.preventDefault();
    const newModal = this.modalService.open(CimsUpdateComponent, { size: 'lg', backdrop: 'static', container: '.tab-cims' });
    newModal.result.then().catch();
  }

  /**
   * handle event when clicked on view button
   * @param item data of item was selected
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onViewDetail = item => console.log('onViewDetail', item);

  /**
   * handle event when clicked on edit button
   * @param item data of item was selected
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onUpdateItem = item => {
    const newModal = this.modalService.open(CimsUpdateComponent, { size: 'lg', backdrop: 'static', container: '.tab-cims' });
    newModal.componentInstance.recordId = item.RecordId;
    newModal.result.then().catch();
  }

  /**
   * handle event when clicked on delete button
   * @param item data of item was selected
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onDeleteItem = item => this.modalConfirm.showReference(item.RecordId);

  /**
   * process event when delete action was accepted occurred
   * @param $event customer id was trigger event returned
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onAcceptedDelete = $event => this.store.dispatch(new DeleteCustomer({ customerId: $event }));

  /**
   * handle event when clicked on any page of pagination
   * @param page the page want to show data
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  loadPage = currPage => this.store.dispatch(new LoadCims({ pagination: { currPage, recodperpage: ITEMS_PER_PAGE } }));

  /**
   * handle event when clicked on import button
   * @param {MouseEvent} $event event of mouse
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onImport = $event => this.modalService.open(CimsImportComponent, { size: 'lg', backdrop: 'static', container: '.tab-cims' });

  /**
   * handle event when clicked on search button
   * @param {MouseEvent} $event event of mouse
   * @author daibh
   * @readonly please safe read code before edit this method
   */
  onSearch = () => { }

}
