import { Component, ViewChild } from '@angular/core'
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-calendar-new',
  templateUrl: './calendar-new.component.html',
  styleUrls: ['./calendar-new.component.css'],
  providers: [CalendarService]
})
export class CalendarNewComponent {
  @ViewChild('descriForm', { static: true }) descriForm: any

  endpoint = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/calendar'
  desc:string = ''

  actions:PoPageAction[] = [{
    label: 'Salvar',
    action: this.onSave
  }] 

  breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Calendário' }]
  }
  
  times:any[] = []

  constructor(
    public poNotification: PoNotificationService,
    private calendarService: CalendarService
  ) {}
  
  ngOnInit() {
    this.times.push({
      desc: '',
      entryTime: '',
      exitTime: ''
    })
  }
  onClickAdd(desc:string, entryTime:string, exitTime:string) {
    console.log(desc, entryTime, exitTime)
    if(desc.length > 1 && entryTime.length == 5 && exitTime.length == 5 && exitTime > entryTime) {
      this.desc = desc
      this.times.push({
        desc,
        entryTime,
        exitTime,
        valid: true
      })
    }
  }

  onSave() {
    this.calendarService.postCalendar(this.endpoint, {
      name: this.desc,
      times: this.times.filter(time => time.valid).map(time => ({ entryTime: time.entryTime, exitTime: time.exitTime }))
    })
  }
}
