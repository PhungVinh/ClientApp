import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { API_GET_ALL_CATEGORY_ORGANIZATION } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryOrganizationService {

  constructor(private httpClient: HttpClient) { }

  fetch(req): Observable<any> {
    console.log('category ORGANIZATION');
    return this.httpClient.get<any>(`${environment.serverApi}/${API_GET_ALL_CATEGORY_ORGANIZATION}`, {params: req}).pipe();
  }
}
