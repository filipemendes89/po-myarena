import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PoDynamicModule, PoModalModule, PoTableModule } from '@po-ui/ng-components'
import { PoPageDynamicTableModule } from '@po-ui/ng-templates'
import { PeopleRoutingModule } from './people-routing.module'
import { PeopleComponent } from './people.component'


@NgModule({
  declarations: [
    PeopleComponent
  ],
  imports: [
    CommonModule,
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule,
    PoTableModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
