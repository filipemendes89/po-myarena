
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PeopleListComponent } from './people-list/people-list.component'
import { PeopleNewComponent } from './people-new/people-new.component'

export const peopleRoutes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'new', component: PeopleNewComponent }
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
