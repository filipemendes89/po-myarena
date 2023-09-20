import { Component, ViewChild } from '@angular/core'
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components'

@Component({
  selector: 'app-calendar-new',
  templateUrl: './calendar-new.component.html',
  styleUrls: ['./calendar-new.component.css']
})
export class CalendarNewComponent {
  @ViewChild('descriForm', { static: true }) descriForm: any

  actions:PoPageAction[] = [{
    label: 'Salvar'
  }] 

  breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Calendário' }]
  }
  
  times:any[] = []

  constructor(
    public poNotification: PoNotificationService,
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
    if(desc.length > 1 && entryTime.length == 5 && exitTime.length == 5 && exitTime > entryTime)
      this.times.push({
        desc,
        entryTime,
        exitTime,
        valid: true
      })
  }
}
