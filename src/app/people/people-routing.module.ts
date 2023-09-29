
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PeopleListComponent } from './people-list/people-list.component'
import { PeopleNewComponent } from './people-new/people-new.component'
import { ProfileComponent } from './profile/profile.component'

export const peopleRoutes: Routes = [
  { 
    path: '', 
    component: PeopleListComponent
  },
  { 
    path: 'new', 
    component: PeopleNewComponent 
  },
  { 
    path: 'edit/:id', 
    component: PeopleNewComponent 
  },
  { 
    path: 'profile', 
    component: ProfileComponent 
  },
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
