import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarModule } from './calendar/calendar.module'
import { ClassModule } from './class/class.module'
import { CourtModule } from './court/court.module'
import { ObjectModule } from './object/object.module'
import { PeopleModule } from './people/people.module'
import { UnitModule } from './unit/unit.module'

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
    path: 'class', 
    loadChildren: () => ClassModule
  },
  { 
    path: 'court', 
    loadChildren: () => CourtModule
  },
  { 
    path: 'calendar', 
    loadChildren: () => CalendarModule
  },
  { 
    path: 'object', 
    loadChildren: () => ObjectModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
