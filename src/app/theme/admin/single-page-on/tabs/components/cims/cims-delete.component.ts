import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { State } from '../../../../admin.state';

@Component({
    selector: 'app-cims-delete',
    template: `
        <div *ngIf="!ignore">
            <div class="modal-header">
                <h6 class="modal-title text-center">{{msgOK | translate}}</h6>
            </div>
            <div class="modal-body text-center">
                <button class="btn btn-primary mr-2" data-dismiss="modal" type="button"  (click)="delete()"><span>Có</span> </button>
                <button class="btn  btn-default " data-dismiss="modal" type="button" style="background: #ddd; color: black" (click)="clear()"><span>{{'Không' | translate}}</span> </button>
            </div>
        </div>
        <div *ngIf="ignore">
            <div class="modal-header">
                <h6 class="modal-title text-center">{{msgIgnore | translate}}</h6>
            </div>
            <div class="modal-body text-center">
                <button class="btn  btn-default " data-dismiss="modal" type="button" style="background: #ddd; color: black" (click)="clear()"><span>Đóng</span> </button>
            </div>
        </div>
    `,
})
export class CimsDeleteComponent implements OnInit {
    item: any;
    ignore: any;
    msgOK = 'Xóa thông tin đã chọn';
    msgIgnore = 'Không được xóa dữ liệu này';
    constructor(
        private activeModal: NgbActiveModal,
        private store: Store<State>
    ) {
    }

    ngOnInit() {
        console.log(this.item, this.ignore);
    }
    clear() {
        this.activeModal.close();
    }
    delete() {
        console.log('DELETING...', this.item);
        this.clear();
    }
}
