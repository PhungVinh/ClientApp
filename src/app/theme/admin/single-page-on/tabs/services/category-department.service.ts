import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { API_ACOOUNT_CATEGORY_DEPARTMENT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryDepartmentService {

  constructor(private httpClient: HttpClient) { }

  fetch(req): Observable<any> {
    console.log('category DEPARTMENT');
    return this.httpClient.get<any>(`${environment.serverApi}/${API_ACOOUNT_CATEGORY_DEPARTMENT}`, {params: req}).pipe();
  }
}
