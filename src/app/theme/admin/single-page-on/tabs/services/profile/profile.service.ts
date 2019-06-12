import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { API_PROFILE_UPDATE, API_PROFILE_UPLOAD } from 'src/app/app.constant';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private httpClient: HttpClient) { }

    uploadFile(req): Observable<any> {
        return this.httpClient.post<any>(`${environment.serverApi}/${API_PROFILE_UPLOAD}`, req).pipe();
    }
    updateProfile(req): Observable<any> {
        return this.httpClient.post<any>(`${environment.serverApi}/${API_PROFILE_UPDATE}`, req);
    }
}
