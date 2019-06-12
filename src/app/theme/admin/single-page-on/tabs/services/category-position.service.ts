import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { API_ACCOUNT_GET_ALL_CATEGORY_POSITION } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryPositionService {

  constructor(private httpClient: HttpClient) { }

  fetch(req): Observable<any> {
    console.log('category');
    return this.httpClient.get<any>(`${environment.serverApi}/${API_ACCOUNT_GET_ALL_CATEGORY_POSITION}`, {params: req}).pipe();
  }
}
