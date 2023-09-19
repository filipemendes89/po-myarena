import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoAvatarModule, PoButtonModule, PoCalendarMode, PoCalendarModule, PoContainerModule, PoDynamicModule, PoImageModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoPageModule, PoSwitchModule } from '@po-ui/ng-components'
import { CourtListComponent } from './court-list/court-list.component'
import { CourtRoutingModule } from './court-routing.module';
import { CourtNewComponent } from './court-new/court-new.component'



@NgModule({
  declarations: [
    CourtListComponent,
    CourtNewComponent
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
    PoCalendarModule,
    PoDynamicModule,
    PoButtonModule,
    PoLoadingModule
  ]
})
export class CourtModule { }
