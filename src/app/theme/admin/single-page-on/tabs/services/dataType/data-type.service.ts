import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ATTRIBUTE_GET_DATETYPE_LIST } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  constructor(private http: HttpClient) { }

  getAllDataType(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_DATETYPE_LIST}`);
  }
}
