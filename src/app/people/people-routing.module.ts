
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PeopleComponent } from './people.component'

export const peopleRoutes: Routes = [
  { path: '', component: PeopleComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(peopleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PeopleRoutingModule { }
