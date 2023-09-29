import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoAvatarModule, PoButtonModule, PoContainerModule, PoDisclaimerGroupModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoLoadingModule, PoModalModule, PoNotificationModule, PoPageModule, PoStepperModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components'
import { PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates'
import { PeopleListComponent } from './people-list/people-list.component'
import { PeopleNewComponent } from './people-new/people-new.component'
import { PeopleRoutingModule } from './people-routing.module'
import { PeopleWidgetComponent } from './people-widget/people-widget.component';
import { ProfileComponent } from './profile/profile.component'
@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleNewComponent,
    PeopleWidgetComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule,
    PoTableModule,
    PeopleRoutingModule,
    PoFieldModule,
    PoWidgetModule,
    PoInfoModule,
    PoStepperModule,
    PoLoadingModule,
    PoPageDynamicEditModule,
    PoPageModule,
    PoAvatarModule,
    PoButtonModule,
    PoNotificationModule,
    PoContainerModule,
    PoDisclaimerGroupModule
  ]
})
export class PeopleModule { }
