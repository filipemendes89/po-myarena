import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { PoModule } from '@po-ui/ng-components'
import { PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CourtListComponent } from './court/court-list/court-list.component'
import { ObjectListComponent } from './object/object-list/object-list.component'
import { PeopleListComponent } from './people/people-list/people-list.component'
import { UnitListComponent } from './unit/unit-list/unit-list.component'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent },
      {path: 'people', component: PeopleListComponent },
      {path: 'unit', component: UnitListComponent },
      {path: 'court', component: CourtListComponent },
      {path: 'object', component: ObjectListComponent },
    ]),
    PoTemplatesModule,
    PoPageDynamicTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
