import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { isNumber } from 'src/app/shared/util/common.util';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UploadService } from '../../../services/upload/upload.service';

@Component({
  selector: 'app-cims-import',
  templateUrl: './cims-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cims-import.component.scss']
})
export class CimsImportComponent implements OnInit, OnDestroy {
  URL = 'http://localhost:8081/api/upload-file';
  selectedFile: File;
  showMessage: boolean;
  message: string;
  uploadStatus: 'START' | 'UPLOADING' | 'COMPLETED' | 'CANCELLED' | 'ERROR';
  uploadProgress: number = 0;
  uploadedPercentage: any;
  unsubscription: Subject<any> = new Subject<any>();
  progress$: Observable<any>;
  constructor(
    private ngbActiveModal: NgbActiveModal,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.progress$ = this.uploadService.getObservable()
      .pipe(takeUntil(this.unsubscription));
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const fd = new FormData();
      this.showMessage = false;
      console.log('onUpload');
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadService.upload(fd);
    }
  }

  clear = () => this.ngbActiveModal.close();

  onSubmit = () => {
  }

  ngOnDestroy() {
    this.unsubscription.next();
    this.unsubscription.complete();
  }
}
