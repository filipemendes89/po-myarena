import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoAvatarModule, PoDatepickerModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components'
import { ReservationListComponent } from './reservation-list/reservation-list.component'
import { ReservationRoutingModule } from './reservation-routing.module'


@NgModule({
  declarations: [
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    PoPageModule,
    PoWidgetModule,
    PoInfoModule,
    PoAvatarModule,
    PoDatepickerModule,
    PoListViewModule,
    PoLoadingModule
  ]
})
export class ReservationModule { }
