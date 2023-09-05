
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UnitListComponent } from './unit-list/unit-list.component'
import { UnitNewComponent } from './unit-new/unit-new.component'
//import { UnitNewComponent } from './unit-new/unit-new.component'

export const unitRoutes: Routes = [
  { 
    path: '', 
    component: UnitListComponent
  },
  { 
    path: 'new', 
    component: UnitNewComponent
  },
  { 
    path: 'edit/:id', 
    component: UnitNewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(unitRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UnitRoutingModule { }
