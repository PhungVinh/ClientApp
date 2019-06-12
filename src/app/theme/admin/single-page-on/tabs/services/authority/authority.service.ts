import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { API_AUTHORITY_INFO } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
    constructor(private httpClient: HttpClient) { }
    
    getAllAuthority(params) {
        return this.httpClient.get<any>(`${environment.serverApi}/Authority/SearchAuthority`, { params }).pipe();
    }

    addAuthority(body) {
        return this.httpClient.post<any>(`${environment.serverApi}/Authority/CreateAuthority`, body, { observe: 'response' }).pipe();
    }

    updateAuthority(body) {
        return this.httpClient.put<any>(`${environment.serverApi}/Authority/UpdateAuthority`, body, { observe: 'response' }).pipe();
    }

    deleteAuthority(id) {
        return this.httpClient.delete<any>(`${environment.serverApi}/Authority/DeleteAuthority/${id}`).pipe(); 
    }

    getRoleByModule(params) {
        return this.httpClient.get<any>(`${environment.serverApi}/Authority/SearchMenuAndRole`, { params }).pipe();
    }

    copyAuthority(id) {
        return this.httpClient.get<any>(`${environment.serverApi}/Authority/CopyAuthority/${id}`).pipe();
    }

    authorityUserEdit(body) {
        return this.httpClient.post<any>(`${environment.serverApi}/Authority/GrantAuthority`, body, { observe: 'response' }).pipe();
    }

    getAuthorityInfo() {
        return this.httpClient.get<any>(`${environment.serverApi}/${API_AUTHORITY_INFO}`).pipe();
    }

    checkDuplicateAuthorityname(authorityName, authorityId = null) {
        let params;
        if (authorityId) {
            params = { authorityId: authorityId, name: authorityName }
        } else {
            params = { name: authorityName }
        }
        return this.httpClient.get<any>(`${environment.serverApi}/Authority/CheckDupicate`, { params: params }).pipe();
    }
}