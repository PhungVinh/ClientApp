import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-kms-new',
    templateUrl: './kms-new.component.html',
    styleUrls: []
})
export class KmsNewComponent implements OnInit {

    currentObj: any;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

}
