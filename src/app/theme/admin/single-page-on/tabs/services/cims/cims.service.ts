import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { API_ATTRIBUTE_GET_CIMS, API_ATTRIBUTE_GET_LIST, API_CIMS_POST_FORM, API_CIMIS_MODULE, API_ATTRIBUTE_GET_FORM, API_CIMS_GET_FORM_DATA, API_CIMS_PUT_FORM, API_CIMS_DELETE } from '../../../../../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class CimsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  fetch({ formId: any }): Observable<any> {
    return this.httpClient.get(`${environment.serverApi}/${API_ATTRIBUTE_GET_LIST}`, { params: { formId: any } });
  }

  fetchFormConfig(ChildCode: any): Observable<any> {
    return this.httpClient.get(`${environment.serverApi}/${API_ATTRIBUTE_GET_FORM}`, { params: { ChildCode } });
  }

  create(customer: any): Observable<any> {
    return this.httpClient.post(`${environment.serverApi}/${API_CIMS_POST_FORM}`, customer);
  }

  update(customer: any): Observable<any> {
    return this.httpClient.put(`${environment.serverApi}/${API_CIMS_PUT_FORM}`, customer);
  }

  delete(customerId: any): Observable<any> {
    return this.httpClient.delete(`${environment.serverApi}/${API_CIMS_DELETE}`, { params: { RecordId: customerId } });
  }

  fetchCims(req: { pagination: any }): Observable<any> {
    const reqOption = { ...req.pagination, ModuleParent: API_CIMIS_MODULE };
    // return of(JSON.parse('{"data":[{"AttributeCode":"ATTRIBUTE5","AttributeLabel":"Email","AttrOrder":1},{"AttributeCode":"ATTRIBUTE4","AttributeLabel":"Ngày sinh","AttrOrder":2},{"AttributeCode":"ATTRIBUTE3","AttributeLabel":"Địa chỉ","AttrOrder":3},{"AttributeCode":"ATTRIBUTE2","AttributeLabel":"Mã khách hàng","AttrOrder":4}],"data1":[{"AttributeCode":"ATTRIBUTE2","AttributeLabel":"Mã khách hàng","IndexTitleTable":1},{"AttributeCode":"ATTRIBUTE3","AttributeLabel":"Địa chỉ","IndexTitleTable":2},{"AttributeCode":"ATTRIBUTE4","AttributeLabel":"Ngày sinh","IndexTitleTable":3},{"AttributeCode":"ATTRIBUTE5","AttributeLabel":"Email","IndexTitleTable":4},{"AttributeCode":"ATTRIBUTE1","AttributeLabel":"Tên","IndexTitleTable":5},{"AttributeCode":"ATTRIBUTE6","AttributeLabel":"Giới tính2","IndexTitleTable":6}],"data2":[{"Index":1,"RecordId":"201905041725486611223","Mã khách hàng":"abc","Địa chỉ":"hn","Ngày sinh":"29/91","Email":"dsa@gmail.com","Tên":"tran van phong","Giới tính2":"Nam"},{"Index":2,"RecordId":"201905051620273183057","Mã khách hàng":"TVP","Địa chỉ":"Ha noi","Ngày sinh":"29/01/1991","Email":null,"Tên":"Tran Van Phong","Giới tính2":null},{"Index":3,"RecordId":"201905061155025464246","Mã khách hàng":"ppp2","Địa chỉ":"nam dinh","Ngày sinh":"1991","Email":null,"Tên":"Phong2","Giới tính2":null}]}'));
    return this.httpClient.get(`${environment.serverApi}/${API_ATTRIBUTE_GET_CIMS}`, { params: reqOption });
  }

  fetchDetailCims({ RecordId: string }): Observable<any> {
    return this.httpClient.get(`${environment.serverApi}/${API_CIMS_GET_FORM_DATA}`, { params: { RecordId: string } });
  }

}
