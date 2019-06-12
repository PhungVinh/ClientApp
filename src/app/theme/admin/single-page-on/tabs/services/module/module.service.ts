import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ACCOUNT_GET_MENU_PARENT } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  getAllModule(): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ACCOUNT_GET_MENU_PARENT}`);
  }

}
