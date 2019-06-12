import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ATTRIBUTE_GET_CONTROLLER_LIST_OBJECT, API_ATTRIBUTE_GET_CONTROLLER_LIST } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class TypeObjectService {
  private apiUrl = 'http://192.168.50.13:50000';

  constructor(private http: HttpClient) { }

  getAllTypeObject(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CONTROLLER_LIST}`);
  }

  getAllTypeObjectInConstraints(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CONTROLLER_LIST_OBJECT}`);
  }
}
