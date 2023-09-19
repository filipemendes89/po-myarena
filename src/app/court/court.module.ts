import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoAvatarModule, PoCalendarMode, PoCalendarModule, PoContainerModule, PoImageModule, PoInfoModule, PoListViewModule, PoPageModule, PoSwitchModule } from '@po-ui/ng-components'
import { CourtListComponent } from './court-list/court-list.component'
import { CourtRoutingModule } from './court-routing.module'



@NgModule({
  declarations: [
    CourtListComponent
  ],
  imports: [
    CommonModule,
    CourtRoutingModule,
    PoPageModule,
    PoListViewModule,
    PoInfoModule,
    PoAvatarModule,
    PoImageModule,
    PoContainerModule,
    PoSwitchModule,
    PoCalendarModule
  ]
})
export class CourtModule { }
