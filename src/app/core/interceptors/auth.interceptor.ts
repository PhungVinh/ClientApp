import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { AUTH_TOKEN } from '../auth/auth.constants';
import { isDefinedProp } from 'src/app/shared/util/common.util';
import { environment } from '@env/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!isDefinedProp(request, 'url') || (/^http/.test(request.url) && !(environment.serverApi && request.url.startsWith(environment.serverApi)))) {
      return next.handle(request);
    }

    const token = this.localStorageService.getItem(AUTH_TOKEN);
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    return next.handle(request);
  }
}
