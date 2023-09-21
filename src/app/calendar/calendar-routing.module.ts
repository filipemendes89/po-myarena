import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarListComponent } from './calendar-list/calendar-list.component'
import { CalendarNewComponent } from './calendar-new/calendar-new.component'

const routes: Routes = [{
  path: '',
  component: CalendarListComponent
},
{
  path: 'new',
  component: CalendarNewComponent
},
{
  path: 'edit/:id',
  component: CalendarNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
