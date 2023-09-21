import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css'],
  providers: [CalendarService]
})
export class CalendarListComponent {
  public readonly actions: PoPageAction[] = [
    {
      label: 'Novo',
      url: '/calendar/new'
    }
  ]

  serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/calendar'
  public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Home', link: '/' }, { label: 'Calendario' }]
  }

  items:Array<any> = []

  constructor(private poNotification: PoNotificationService, private calendarService: CalendarService, private _router: Router) {
    
  }
  ngOnInit(): void {
    this.calendarService.getCalendar(this.serviceApi).subscribe((data:any) => this.items = data)
  }

  onClickEdit(item: any){
    this._router.navigateByUrl(`/calendar/edit/${item.id}`)    
  }
}
