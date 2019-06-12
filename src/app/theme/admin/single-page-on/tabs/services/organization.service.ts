import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Organization } from '../../../../../shared/model/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  fetch(req): Observable<any> {
    return this.httpClient.get<any>(`${environment.serverApi}/Organization/GetOrganizationList`, {params: req}).pipe();
  }
  addOrganization(req: Organization): Observable<HttpResponse<Organization>> {
    return this.httpClient.post<Organization>(`${environment.serverApi}/Organization/AddOrganization`, req, { observe: 'response' }).pipe();
  }
    updateOrganization(req: Organization): Observable<HttpResponse<Organization>> {
        return this.httpClient.put<Organization>(`${environment.serverApi}/Organization/UpdateOrganization`, req, { observe: 'response' }).pipe();
    }
    deleteOrganization(id): Observable<any>  {
    return this.httpClient.delete<any>(`${environment.serverApi}/Organization/DeleteOrganization`, { params: {organizationId: id} }).pipe();
    }
}
