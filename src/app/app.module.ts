import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AuthModule } from '@auth0/auth0-angular'
import { PoChartModule, PoLoadingModule, PoModule } from '@po-ui/ng-components'
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
import { PeopleListComponent } from './people/people-list/people-list.component'
import { PeopleService } from './people/people.service'
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component'
import { StatisticsComponent } from './statistics/statistics.component'
import { UnitListComponent } from './unit/unit-list/unit-list.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, LogoutComponent, StatisticsComponent],
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
          { path: 'reservation', component: ReservationListComponent },
          { path: 'sport', component: UnitListComponent },
        ],
      },
    ]),
    PoTemplatesModule,
    PoPageDynamicTableModule,
    BrowserAnimationsModule,
    PoPageLoginModule,
    PoLoadingModule,
    PoChartModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent],
})
export class AppModule {}
