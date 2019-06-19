import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { API_ACCOUNT_DELETE_USER, API_ACCOUNT_GET_USER, API_ACCOUNT_GET_USER_BY_ID, API_ACCOUNT_GET_USER_LIST, API_ACCOUNT_POST_USER, API_ACCOUNT_PUT_USER, API_AUTHORITY_GET_GIANT, API_UER_RESET_PASSWORD_USER, API_USER_AUTHORITY_PACK, API_USER_AUTHORITY_PACK_BY_ID } from 'src/app/app.constant';
import { User } from '../../../../../../shared/model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //get list user
  fetch(req): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_ACCOUNT_GET_USER_LIST}`, { params: req });
  }
  //get user
  getUser(req) {
    return this.http.get<any>(`${environment.serverApi}/${API_ACCOUNT_GET_USER}`, { params: req });
  }

  addUser(req: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.serverApi}/${API_ACCOUNT_POST_USER}`, req, { observe: 'response' });
  }

  updateUser(req: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${environment.serverApi}/${API_ACCOUNT_PUT_USER}`, req, { observe: 'response' });
  }

  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${environment.serverApi}/${API_ACCOUNT_DELETE_USER}/${id}`, { params: { userId: id } });
  }

  getUserById(id): Observable<User> {
    return this.http.get<any>(`${environment.serverApi}/${API_ACCOUNT_GET_USER_BY_ID}/${id}`, { params: { userId: id } });
  }

  listUserByAuthorityId(authorityId) {
    return this.http.get(`${environment.serverApi}/${API_AUTHORITY_GET_GIANT}/${authorityId}`);
  }

  resetPasswordUser(res): Observable<any> {
    return this.http.post<any>(`${environment.serverApi}/${API_UER_RESET_PASSWORD_USER}`, res);
  }

  // GET list NHÓM QUYỀN
  getUserAuthorityPack(req): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_USER_AUTHORITY_PACK}`, { params: req });
  }

  getUserAuthorityPackById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_USER_AUTHORITY_PACK_BY_ID}/${id}`);
  }

  getUserServicePack(id: any): Observable<any> {
    return this.http.get<any>(`${environment.serverApi}/${API_USER_AUTHORITY_PACK_BY_ID}/${id}`, { params: id });
  }

  constructor(private http: HttpClient) { }
}
