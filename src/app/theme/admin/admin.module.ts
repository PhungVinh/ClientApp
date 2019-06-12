import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEffects } from './admin.effects';
import { FEATURE_NAME, reducers } from './admin.state';
import { OrganizationEffects } from './single-page-on/tabs/effects/organization.effects';
import { AuthorityEffects } from './single-page-on/tabs/effects/authority.effects';
import { SinglePageOnModule } from './single-page-on/single-page-on.module';
import { UserEffects } from './single-page-on/tabs/effects/user.effects';
import { InformationFieldEffects } from './single-page-on/tabs/effects/information-field.effects';
import { ModuleEffects } from './single-page-on/tabs/effects/module.effects';
import { CategoryPositionEffects } from './single-page-on/tabs/effects/category-position.effects';
import { ProfileEffects } from './single-page-on/tabs/effects/profile.effects';
import { CategoryDepartmentEffects } from './single-page-on/tabs/effects/category-department.effects';
import { AttrRelationEffects } from './single-page-on/tabs/effects/attr-relation.effects';
import { CustomerEffects } from './single-page-on/tabs/effects/customer.effects';
import { CategoryEffects } from './single-page-on/tabs/effects/category.effects';
import { AttributesEffects } from './single-page-on/tabs/effects/attributes.effects';
import { CategoryOrganizationEffects } from './single-page-on/tabs/effects/category-organization.effects';
import { EncryptionEffects } from './single-page-on/tabs/effects/encryption.effects';


@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
        SinglePageOnModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([
            AdminEffects,
            OrganizationEffects,
            AuthorityEffects,
            CustomerEffects,
            UserEffects,
            CategoryPositionEffects,
            ProfileEffects,
            CategoryDepartmentEffects,
            InformationFieldEffects,
            ModuleEffects,
            AttrRelationEffects,
            CategoryEffects,
            InformationFieldEffects,
            ModuleEffects,
            AttrRelationEffects,
            InformationFieldEffects,
            ModuleEffects,
            AttrRelationEffects,
            AttributesEffects,
            CategoryOrganizationEffects,
            EncryptionEffects
        ])
    ],
    declarations: [],
    providers: [],
})
export class AdminModule {
    constructor() {
    }

}
