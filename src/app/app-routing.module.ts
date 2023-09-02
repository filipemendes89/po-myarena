import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PeopleModule } from './people/people.module'

const routes: Routes = [
  { 
    path: 'people', 
    loadChildren: () => PeopleModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
