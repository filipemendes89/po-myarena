import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { PoModule } from '@po-ui/ng-components'
import { PoPageDynamicTableModule, PoTemplatesModule } from '@po-ui/ng-templates'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PeopleListComponent } from './people/people-list/people-list.component'
import { PeopleNewComponent } from './people/people-new/people-new.component'
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
      {
        path: '', 
      component: AppComponent },
      {path: 'people', component: PeopleListComponent },
      {path: 'people/new', component: PeopleNewComponent },
    ]),
    PoTemplatesModule,
    PoPageDynamicTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
