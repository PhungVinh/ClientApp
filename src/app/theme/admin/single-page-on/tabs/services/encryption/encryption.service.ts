import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
    API_ENCRYPTION_GET,
    API_ENCRYPTION_GET_FIELD_BY_MODULE,
    API_ENCRYPTION_GET_MODULE,
    API_ENCRYPTION_UPDATE
} from '../../../../../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor(private httpClient: HttpClient) { }

  fetch(res): Observable<any> {
    return this.httpClient.get<any>(`${environment.serverApi}/${API_ENCRYPTION_GET}`, {params: res}).pipe();
  }
  getModuleEncrytion(): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_ENCRYPTION_GET_MODULE}`).pipe();
  }
  getFieldByModuleEncrytion(res): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_ENCRYPTION_GET_FIELD_BY_MODULE}`, {params: res}).pipe();
  }
    updateEncrytion(res): Observable<any> {
        return this.httpClient.post<any>(`${environment.serverApi}/${API_ENCRYPTION_UPDATE}`, res).pipe();
    }
}
