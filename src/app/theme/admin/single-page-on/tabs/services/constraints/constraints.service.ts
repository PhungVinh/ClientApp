import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ATTRIBUTE_GET_CONSTRANT_ALL_1, API_ATTRIBUTE_GET_CONSTRANT_ALL, API_ATTRIBUTE_POST_CONSTRAINT_ADD, API_ATTRIBUTE_PUT_CONSTRAINT_UPDATE, API_ATTRIBUTE_PUT_DELETE_CONSTRAINT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ConstraintsService {

  constructor(private http: HttpClient) { }

  getAllConstraints(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CONSTRANT_ALL_1}`);
  }

  getAllConstraintsPagi(req): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CONSTRANT_ALL}`, { params: req });
  }

  addConstraint(constraint): Observable<any> {
    return this.http.post<any>(`${environment.serverApi}/${API_ATTRIBUTE_POST_CONSTRAINT_ADD}`, constraint);
  }

  updateConstraint(constraint): Observable<any> {
    return this.http.put<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_CONSTRAINT_UPDATE}`, constraint);
  }

  deleteConstraint(Id: any): Observable<any> {
    console.log('service', Id);
    return this.http.delete<any>(`${environment.serverApi}/${API_ATTRIBUTE_PUT_DELETE_CONSTRAINT}`, { params: { Id } });
  }
}
