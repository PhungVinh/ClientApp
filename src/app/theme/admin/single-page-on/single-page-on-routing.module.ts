import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SinglePageOnComponent} from './single-page-on.component';

const routes: Routes = [
  {
    path: '',
    component: SinglePageOnComponent,
    data: {
      title: 'Sample Page',
      icon: 'icon-layout-sidebar-left',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - sample page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinglePageOnRoutingModule { }
