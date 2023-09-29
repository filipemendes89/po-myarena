import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AuthModule } from '@auth0/auth0-angular'
import { PoLoadingModule, PoModule } from '@po-ui/ng-components'
import {
  PoPageDynamicTableModule,
  PoPageLoginModule,
  PoTemplatesModule
} from '@po-ui/ng-templates'
import { environment as env } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CalendarListComponent } from './calendar/calendar-list/calendar-list.component'
import { ClassListComponent } from './class/class-list/class-list.component'
import { CourtListComponent } from './court/court-list/court-list.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login/login.component'
import { LogoutComponent } from './logout/logout/logout.component'
import { ObjectListComponent } from './object/object-list/object-list.component'
import { PeopleListComponent } from './people/people-list/people-list.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, LogoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      authorizationParams: {
        redirect_uri: env.auth.redirectUri
      },
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: 'people', component: PeopleListComponent },
          { path: 'class', component: ClassListComponent },
          { path: 'court', component: CourtListComponent },
          { path: 'calendar', component: CalendarListComponent },
          { path: 'object', component: ObjectListComponent },
        ],
      },
    ]),
    PoTemplatesModule,
    PoPageDynamicTableModule,
    BrowserAnimationsModule,
    PoPageLoginModule,
    PoLoadingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
