import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { PoModule } from '@po-ui/ng-components'
import { PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CalendarListComponent } from './calendar/calendar-list/calendar-list.component'
import { ClassNewComponent } from './class/class-new/class-new.component'
import { CourtListComponent } from './court/court-list/court-list.component'
import { HomeComponent } from './home/home.component'
import { ObjectListComponent } from './object/object-list/object-list.component'
import { PeopleListComponent } from './people/people-list/people-list.component'
import { ClassListComponent } from './class/class-list/class-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent },
      {path: 'people', component: PeopleListComponent },
      {path: 'class', component: ClassListComponent },
      {path: 'court', component: CourtListComponent },
      {path: 'calendar', component: CalendarListComponent },
      {path: 'object', component: ObjectListComponent },
    ]),
    PoTemplatesModule,
    PoPageDynamicTableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
