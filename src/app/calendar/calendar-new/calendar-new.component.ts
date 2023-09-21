import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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
  id: any
  isHideLoading = true

  actions:PoPageAction[] = [{
    label: 'Salvar',
    action: this.onSave.bind(this)
  },
  {
    label: 'Cancelar',
    url: '/calendar'
  }] 

  breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Calendário' }, { label: 'Novo' }]
  }
  
  times:any[] = []

  constructor(
    private calendarService: CalendarService,
    public poNotification: PoNotificationService,
    private _router:Router,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.id = this.activatedRoute.snapshot?.params['id']
    if (this.id) {
      this.isHideLoading = false
      this.calendarService.getCalendar(`${this.endpoint}/${this.id}`,).subscribe((data:any) => {
        this.times = data.times
        this.desc = data.name
      },
      () => {
        this.poNotification.error(`Erro na busca do calendário. Id: ${this.id}`);
        this.isHideLoading = true;
      },
      () => (this.isHideLoading = true))
    } else {
      this.times.push({
        desc: '',
        entryTime: '',
        exitTime: ''
      })
    }
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
    }).subscribe({ 
      complete: () => { 
        this.poNotification.success('Registro inserido com sucesso') 
        this._router.navigateByUrl('/calendar')
      },
  error: (error) => this.poNotification.error(error)  })
  }
}
