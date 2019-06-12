import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../admin.state';
import { OrganizationsDelete } from '../../actions/organization.actions';
import { selectOrganizationUpdate } from '../../selectors/organization.selectors';

@Component({
    selector: 'app-oganization-delete',
    template: `
        <div *ngIf="chkDelete === 'true'">
            <div class="modal-header">
                <h6 class="modal-title text-center">{{'Xóa thông tin đã chọn' | translate}}</h6>
            </div>
            <div class="modal-body text-center">
                <button class="btn btn-primary mr-2" data-dismiss="modal" type="button"  (click)="delete()"><span>Có</span> </button>
                <button class="btn  btn-default " data-dismiss="modal" type="button" style="background: #ddd; color: black" (click)="clear()"><span>{{'Không' | translate}}</span> </button>
            </div>
        </div>
        <div *ngIf="chkDelete !== 'true'">
            <div class="modal-header">
                <h6 class="modal-title text-center">{{'Không được xóa đơn vị này' | translate}}</h6>
            </div>
            <div class="modal-body text-center">
                <button class="btn  btn-default " data-dismiss="modal" type="button" style="background: #ddd; color: black" (click)="clear()"><span>Đóng</span> </button>
            </div>
        </div>
    `,
})
export class OganizationDeleteComponent implements OnInit {
    id: number;
    chkDelete: any;

    constructor(
        private activeModal: NgbActiveModal,
        private store: Store<State>
    ) { }

    ngOnInit() { }

    clear() {
        this.activeModal.close();
    }

    delete() {
        console.log(this.id);
        this.store.dispatch(new OrganizationsDelete({ organizationId: this.id }));
        this.store.pipe(select(selectOrganizationUpdate)).subscribe(isLoading => {
            if (isLoading) {
                this.clear();
            }
        });
    }
}
