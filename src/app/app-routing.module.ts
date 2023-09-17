import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PeopleModule } from './people/people.module'
import { UnitModule } from './unit/unit.module';
import { ObjectModule } from './object/object.module';

const routes: Routes = [
  { 
    path: 'people', 
    loadChildren: () => PeopleModule
  },
  { 
    path: 'unit', 
    loadChildren: () => UnitModule
  },
  { 
    path: 'object', 
    loadChildren: () => ObjectModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
