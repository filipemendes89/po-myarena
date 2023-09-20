import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarNewComponent } from './calendar-new/calendar-new.component'

const routes: Routes = [{
  path: '',
  component: CalendarNewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
