import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import {
    API_CATEGORY_ALL, API_GET_IMAGE,
    API_ORGANIZATION_ADD,
    API_ORGANIZATION_DELETE,
    API_ORGANIZATION_GET_ALL,
    API_ORGANIZATION_INFO, API_ORGANIZATION_SERVICE_PACK,
    API_ORGANIZATION_UPDATE, API_ORGANIZATION_UPDATE_INFOR,
    API_ORGANIZATION_UPLOAD, API_ORGANIZATION_UPLOADFILE, API_PROFILE_UPLOAD
} from '../../../../../../app.constant';
import {Organization} from '../../../../../../shared/model/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  fetch(req): Observable<any> {
    return this.httpClient.get<any>(`${environment.serverApi}/${API_ORGANIZATION_GET_ALL}`, {params: req}).pipe();
  }
  addOrganization(req: Organization): Observable<HttpResponse<Organization>> {
    return this.httpClient.post<Organization>(`${environment.serverApi}/${API_ORGANIZATION_ADD}`, req, { observe: 'response' }).pipe();
  }

  updateOrganization(req: Organization): Observable<HttpResponse<Organization>> {
    return this.httpClient.put<Organization>(`${environment.serverApi}/${API_ORGANIZATION_UPDATE}`, req, { observe: 'response' }).pipe();
  }
  deleteOrganization(id): Observable<any>  {
  return this.httpClient.delete<any>(`${environment.serverApi}/${API_ORGANIZATION_DELETE}`, { params: {organizationId: id} }).pipe();
  }
  uploadFile(req): Observable<any> {
      return this.httpClient.post<any>(`${environment.serverApi}/${API_ORGANIZATION_UPLOAD}`, req).pipe();
  }
  getInforOrg(): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_ORGANIZATION_INFO}`).pipe();
  }
  getAllCategory(): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_CATEGORY_ALL}`, {params: {CategoryTypeCode: 'Business'}}).pipe();
  }
  uploadFileInfor(req): Observable<any> {
      return this.httpClient.post<any>(`${environment.serverApi}/${API_ORGANIZATION_UPLOADFILE}`, req).pipe();
  }
  getLinkImage(req): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_GET_IMAGE}`, {params: req}).pipe();
  }
  updateOrganizationInfor(req: any): Observable<HttpResponse<any>> {
      return this.httpClient.put<any>(`${environment.serverApi}/${API_ORGANIZATION_UPDATE_INFOR}`, req, { observe: 'response' }).pipe();
  }
  getOrgServicePack(req): Observable<any> {
      return this.httpClient.get<any>(`${environment.serverApi}/${API_ORGANIZATION_SERVICE_PACK}`, {params: req}).pipe();
  }
}
