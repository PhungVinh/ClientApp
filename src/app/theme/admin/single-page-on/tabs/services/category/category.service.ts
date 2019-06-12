import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { API_ATTRIBUTE_GET_CATEGORY_PARENT, API_ATTRIBUTE_GET_CATEGORY_CHILD, API_CATEGORY_GET_ALL, API_CATEGORY_GET_ALL_PARENT, API_CATEGORY_POST_ADD, API_CATEGORY_GET_OBJECT, API_CATEGORY_DELETE, API_CATEGORY_PUT_UPDATE } from 'src/app/app.constant';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    getAllCategory(): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CATEGORY_PARENT}`);
    }

    getAllChildCategory(): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CATEGORY_CHILD}`);
    }

    fetchCategory(params): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_CATEGORY_GET_ALL}`, { params });
    }

    fetchParentCategory(): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_CATEGORY_GET_ALL_PARENT}`);
    }

    fetchChildrenCategory(): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_ATTRIBUTE_GET_CATEGORY_CHILD}`);
    }

    addCategory(body): Observable<any> {
        return this.http.post<any>(`${environment.serverApi}/${API_CATEGORY_POST_ADD}`, body, { observe: 'response' });
    }

    getCategoryEdit(params): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/${API_CATEGORY_GET_OBJECT}`, { params });
    }

    deleteCategory(params): Observable<any> {
        return this.http.delete<any>(`${environment.serverApi}/${API_CATEGORY_DELETE}`, { params });
    }

    updateCategory(body): Observable<any> {
        console.log('body', body);
        return this.http.put<any>(`${environment.serverApi}/${API_CATEGORY_PUT_UPDATE}`, body, { observe: 'response' })
    }

    checkDeleteCategory(params): Observable<any> {
        return this.http.get<any>(`${environment.serverApi}/Category/checkCategoryCode`, { params }).pipe()
    }
}
