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

  serviceApi = 'http://localhost:7071/api/calendar'
  public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Home', link: '/' }, { label: 'Calendario' }]
  }

  items:Array<any> = []

  constructor(private poNotification: PoNotificationService, private calendarService: CalendarService, private _router: Router) {
    
  }

  ngOnInit(): void {
    this.calendarService.getCalendar(this.serviceApi).subscribe(
      (data:any) => {
        data.items.map((item:any) => {
          item.times.sort((itemA:any, itemB:any) => Number(new Date(`2023-01-01 ${itemA.entryTime}`)) - Number(new Date(`2023-01-01 ${itemB.entryTime}`))) 
        })
        this.items = data.items 
      }
    )
  }

  onClickEdit(item: any){
    this._router.navigateByUrl(`/calendar/edit/${item._id}`)    
  }

  onClickDelete(item:any){
    this.calendarService.deleteCalendar(this.serviceApi, item).subscribe({
      complete: () => { 
        this.poNotification.information('Registro deletado com sucesso')
        this.ngOnInit()
      },
      error: (error) => {
        this.poNotification.error('Erro na deleção do registro')
        this.poNotification.error(error)
      }
    })
  }
}
