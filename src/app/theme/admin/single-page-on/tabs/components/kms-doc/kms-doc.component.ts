import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {KmsNewComponent} from './kms-new.component';

@Component({
    selector: 'app-kms-doc',
    templateUrl: './kms-doc.component.html',
    styleUrls: ['./kms-doc.component.css'],
    providers: [NgbModalConfig, NgbModal]
})
export class KmsDocComponent implements OnInit {

    constructor(private store: Store<any>,
                config: NgbModalConfig,
                private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
    }

    doAddNew = ($event) => {
        $event.preventDefault();
        const modalRef = this.modalService.open(KmsNewComponent, {size: 'lg', container: '.tab-kms'});
        modalRef.componentInstance.currentObj = new Object();
        modalRef.result.then(res => {
        }, err => {
        });
    };

}
