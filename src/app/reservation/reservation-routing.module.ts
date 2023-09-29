import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClassGuard } from '../class/class.guard'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationNewComponent } from './reservation-new/reservation-new.component'

const routes: Routes = [{
  path: '',
  component: ReservationListComponent,
  canActivate: [ClassGuard]
},
{
  path: 'new',
  component: ReservationNewComponent,
  canActivate: [ClassGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
