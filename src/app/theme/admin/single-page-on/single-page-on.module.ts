import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from 'angular2-datatable';
import { TextMaskModule } from 'angular2-text-mask';
import { SelectModule } from 'ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ng2-ui-switch/dist';
import { SharedModule } from 'src/app/shared/shared.module';
import { SinglePageOnRoutingModule } from './single-page-on-routing.module';
import { SinglePageOnComponent } from './single-page-on.component';
import { AttrFormComponent } from './tabs/components/attr-form/attr-form.component';
import { AttrRelationComponent } from './tabs/components/attr-relation/attr-relation.component';
import { AuthorityDeleteComponent } from './tabs/components/authority/authority-delete/authority-delete.component';
import { AuthorityEditUserComponent } from './tabs/components/authority/authority-edit-user/authority-edit-user.component';
import { AuthorityAddComponent } from './tabs/components/authority/authority-form/authority-form.component';
import { AuthorityComponent } from './tabs/components/authority/authority-list/authority.component';
import { CheckDuplicateAsyncNameDirective } from './tabs/components/authority/directive/check-duplicate-async-name.directive';
import { CategoryFormComponent } from './tabs/components/category/category-form/category-form.component';
import { CategoryComponent } from './tabs/components/category/category-list/category.component';
import { CimsDeleteComponent } from './tabs/components/cims/cims-delete.component';
import { CimsImportComponent } from './tabs/components/cims/cims-import/cims-import.component';
import { CimsUpdateComponent } from './tabs/components/cims/cims-update/cims-update.component';
import { CimsComponent } from './tabs/components/cims/cims.component';
import { EncryptionComponent } from './tabs/components/encryption/encryption.component';
import { FilterName } from './tabs/components/form-list/filter.pipe';
import { FormListComponent } from './tabs/components/form-list/form-list.component';
import { InfoOrganizationComponent } from './tabs/components/info-organization/info-organization.component';
import { InformationFieldComponent } from './tabs/components/information-field/information-field.component';
import { KmsDocComponent } from './tabs/components/kms-doc/kms-doc.component';
import { KmsNewComponent } from './tabs/components/kms-doc/kms-new.component';
import { ModuleComponent } from './tabs/components/module/module.component';
import { OmsComponent } from './tabs/components/oms/oms.component';
import { OganizationDeleteComponent } from './tabs/components/organization/oganization-delete.component';
import { OrganizationUpdateComponent } from './tabs/components/organization/organization-update.component';
import { OrganizationComponent } from './tabs/components/organization/organization.component';
import { ProfileComponent } from './tabs/components/profile/profile.component';
import { UserNewComponent } from './tabs/components/user/user-new/user-new.component';
import { UserComponent } from './tabs/components/user/user.component';
import { VocComponent } from './tabs/components/voc/voc.component';

@NgModule({
  imports: [
    CommonModule,
    SinglePageOnRoutingModule,
    SharedModule,
    UiSwitchModule,
    TextMaskModule,
    DataTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    DragDropModule,
    SelectModule,
    Ng2SearchPipeModule,
    NgxDatatableModule
  ],
  declarations: [
    SinglePageOnComponent,
    UserComponent,
    InformationFieldComponent,
    UserNewComponent, OmsComponent,
    AuthorityComponent,
    AttrFormComponent,
    AttrRelationComponent,
    KmsDocComponent,
    CimsComponent,
    VocComponent,
    OrganizationComponent,
    OrganizationUpdateComponent,
    OganizationDeleteComponent,
    AuthorityAddComponent,
    AuthorityDeleteComponent,
    CimsUpdateComponent,
    CimsDeleteComponent,
    ProfileComponent,
    KmsNewComponent,
    AuthorityAddComponent,
    ProfileComponent,
    ModuleComponent,
    AuthorityEditUserComponent,
    FormListComponent,
    CategoryComponent,
    CategoryFormComponent,
    EncryptionComponent,
    CimsImportComponent,
    InfoOrganizationComponent,
    CheckDuplicateAsyncNameDirective,
    FilterName
  ],
  entryComponents: [
    UserNewComponent,
    OrganizationUpdateComponent,
    OganizationDeleteComponent,
    AuthorityAddComponent,
    AuthorityDeleteComponent,
    CimsUpdateComponent,
    KmsNewComponent,
    AuthorityEditUserComponent,
    CimsImportComponent,
    CimsDeleteComponent,
    CategoryFormComponent,
    EncryptionComponent
  ]
})

export class SinglePageOnModule { }
