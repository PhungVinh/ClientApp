import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { CoreModule } from './core/core.module';
import { HorizontalNavComponent } from './layout/admin/horizontal-nav/horizontal-nav.component';
import { ChangePasswordUerComponent } from "./theme/auth/change-password-uer/change-password-uer.component";
import { SettingsModule } from './settings';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
    HorizontalNavComponent,
    ChangePasswordUerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // core & shared
    SharedModule,
    CoreModule,

    // features
    SettingsModule,

    AppRoutingModule,
  ],
  entryComponents: [ChangePasswordUerComponent],
  schemas: [],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
