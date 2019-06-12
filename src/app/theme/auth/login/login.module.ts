import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../../../shared/shared.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   },
    //   isolate: true
    // }),
  ],
  declarations: []
})
export class LoginModule { }

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(
//     http,
//     `${environment.i18nPrefix}/assets/i18n/views/`,
//     '.json'
//   );
// }