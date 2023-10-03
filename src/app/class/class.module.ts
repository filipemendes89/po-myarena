import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PoAvatarModule, PoButtonModule, PoContainerModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoModalModule, PoPageModule, PoStepperModule, PoTableModule, PoTagModule, PoWidgetModule } from '@po-ui/ng-components'
import { PoPageDynamicEditModule } from '@po-ui/ng-templates'
import { PeopleModule } from '../people/people.module'
import { ClassListComponent } from './class-list/class-list.component'
import { ClassNewComponent } from './class-new/class-new.component'
import { ClassRoutingModule } from './class-routing.module'


@NgModule({
  declarations: [
    ClassNewComponent,
    ClassListComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule,
    PoPageModule,
    PoStepperModule,
    PoFieldModule,
    PoDynamicModule,
    PoContainerModule,
    PoWidgetModule,
    PoButtonModule,
    PoLoadingModule,
    PoPageDynamicEditModule,
    PoDynamicModule,
    PoAvatarModule,
    PoListViewModule,
    PoInfoModule,
    PeopleModule,
    PoModalModule,
    PoTableModule,
    PoTagModule
  ]
})
export class ClassModule { }
