import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isDefined } from 'src/app/shared/util/common.util';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  progress$: Observable<any>;
  eventTracking: any;
  url = 'http://localhost:8081/api/upload-file';
  progress: {
    status: 'START' | 'UPLOADING' | 'COMPLETED' | 'CANCEL';
    percentage: number;
    loaded?: number;
    total?: number;
  };

  constructor(private httpClient: HttpClient) {
    this.progress$ = new Observable(observe => {
      this.eventTracking = observe;
    });
  }

  getObservable() {
    return this.progress$;
  }

  upload(file: FormData) {
    this.httpClient.post(this.url, file, { observe: 'events', reportProgress: true }).subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.progress = {
            status: 'START',
            percentage: 0,
            loaded: undefined,
            total: undefined
          };
          this.eventTracking.next(this.progress);
          break;
        case HttpEventType.Response:
          this.progress = {
            ... this.progress,
            status: 'COMPLETED'
          };
          this.eventTracking.next(this.progress);
          break;
        case HttpEventType.UploadProgress: {

          if (this.progress.status !== 'UPLOADING') {
            this.progress = {
              ... this.progress,
              status: 'UPLOADING'
            };
          }

          if (Math.round(this.progress.percentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.progress.percentage = Math.round(event['loaded'] / event['total'] * 100);
            this.progress.loaded = event['loaded'];
            this.progress.loaded = event['total'];
            // console.warn('Increment percentage to : ', this.progress);
            this.eventTracking.next(this.progress);
          }
          break;
        }
      }
    });
  }

}
