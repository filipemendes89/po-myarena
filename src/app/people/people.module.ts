import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoDynamicModule, PoFieldModule, PoInfoModule, PoLoadingModule, PoModalModule, PoStepperModule, PoTableModule, PoWidgetModule, PoPageModule, PoAvatarModule, PoButtonModule, PoNotificationModule, PoContainerModule, PoDisclaimerModule, PoDisclaimerGroupModule } from '@po-ui/ng-components'
import { PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates'
import { PeopleListComponent } from './people-list/people-list.component'
import { PeopleNewComponent } from './people-new/people-new.component'
import { PeopleRoutingModule } from './people-routing.module'
import { PeopleService } from './people.service';
import { PessoaWidgetComponent } from './pessoa-widget/pessoa-widget.component'
@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleNewComponent,
    PessoaWidgetComponent
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
