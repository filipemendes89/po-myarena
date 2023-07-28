import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoDynamicModule, PoFieldModule, PoInfoModule, PoLoadingModule, PoModalModule, PoStepperModule, PoTableModule, PoWidgetModule } from '@po-ui/ng-components'
import { PoPageDynamicEditModule, PoPageDynamicTableModule } from '@po-ui/ng-templates'
import { PeopleListComponent } from './people-list/people-list.component'
import { PeopleNewComponent } from './people-new/people-new.component'
import { PeopleRoutingModule } from './people-routing.module'
@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleNewComponent
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
    PoPageDynamicEditModule 
  ]
})
export class PeopleModule { }
