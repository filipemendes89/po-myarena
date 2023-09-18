import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoAvatarModule, PoInfoModule, PoListViewModule, PoPageModule } from '@po-ui/ng-components'
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
    PoAvatarModule
  ]
})
export class CourtModule { }
