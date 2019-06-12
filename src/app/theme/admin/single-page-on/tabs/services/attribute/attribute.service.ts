import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ATTRIBUTE_POST_ADD, API_ATTRIBUTE_PUT_UPDATE, API_ATTRIBUTE_GET_LIST_PARENT, API_ATTRIBUTE_PUT_UPDATE_FORM_LIST } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  addAttribute(attr: any): Observable<any> {
    return this.http.post<any>(`${environment.serverApi}/${API_ATTRIBUTE_POST_ADD}`, attr);
  }

  updateAttribute(attr: any): Observable<any> {
    return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_UPDATE}`, attr);
  }

  getAllAttributes(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_LIST_PARENT}`, { params: { ModuleParent: 'CIMS' } });
  }

  updateAttributeSearch(attr: any): Observable<any> {
    return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_UPDATE_FORM_LIST}`, attr);
  }
}
