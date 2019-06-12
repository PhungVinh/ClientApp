import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
    API_ATTRIBUTE_POST_FORM_CIMS_ADD,
    API_ATTRIBUTE_PUT_UPDATE_FORM_CIMS,
    API_ATTRIBUTE_GET_FORM,
    API_ATTRIBUTE_PUT_UPDATE_FORM_CIMS_LIST,
    API_ATTRIBUTE_PUT_ADD_FORM_CIMS_LIST, API_ATTRIBUTE_PUT_UPDATE_TABLE_FORM_CIMS_LIST
} from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  constructor(private http: HttpClient) { }

  addFormConfig(formConfig: any): Observable<any> {
    return this.http.post<any>(`${environment.serverApi}/${API_ATTRIBUTE_POST_FORM_CIMS_ADD}`, formConfig);
  }

  updateFormConfig(formConfig: any): Observable<any> {
    return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_UPDATE_FORM_CIMS}`, formConfig);
  }

  getFormConfig(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_FORM}`, { params: { ChildCode: 'CIMS_ADD' } });
  }

  updateFormList(formList: any): Observable<any> {
    return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_UPDATE_FORM_CIMS_LIST}`, formList);
  }

    updateTableFormList(table: any): Observable<any> {
        return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_UPDATE_TABLE_FORM_CIMS_LIST}`, table);
    }

    addFormList(formList: any): Observable<any> {
        return this.http.post<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_ADD_FORM_CIMS_LIST}`, formList);
    }

  getFormList(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_FORM}`, { params: { ChildCode: 'CIMS_LIST' } });
  }
}
