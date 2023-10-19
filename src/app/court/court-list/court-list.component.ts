import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import { CalendarView } from 'angular-calendar'
import * as moment from 'moment'
import { Subject } from 'rxjs'
import { ReservationService } from 'src/app/reservation/reservation.service'
import { IReservation } from 'src/app/types/types'
import { ICourt } from '../@types'
import { CourtService } from '../court.service'

@Component({
  selector: 'app-court-list',
  templateUrl: './court-list.component.html',
  styleUrls: ['./court-list.component.css'],
  providers: [CourtService]
})
export class CourtListComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Courts' }]
  }
  
  public readonly actionsPage: Array<PoPageAction> = [
    { label: 'Novo', url: '/court/new', icon: 'po-icon-plus' }
  ]
  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Aula',
      action: (e:any) => this._router.navigateByUrl(`/class/new`),
      icon: 'po-icon-plus'
    },
    {
      label: 'Editar',
      action: (e:any) => this._router.navigateByUrl(`/court/edit/${e._id}`),
      icon: 'po-icon-edit'
    }
  ];

  public readonly literals: PoListViewLiterals = {
    showDetails: 'Mostrar agenda',
  }

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  viewDateLocal: string = moment().format('DD/MMM')
  refresh = new Subject<void>();

  courts: any = []
  isHideLoading = true
  
  constructor(private poNotification: PoNotificationService,private courtService: CourtService,private reservationService: ReservationService, private _router:Router) { }

  ngOnInit() {
    this.isHideLoading = false;
    this.courtService.getCourt().subscribe((data) => { 
      this.courts = data.items
      this.isHideLoading = true
      this.courts = this.courts.map((item:ICourt) => {
         this.reservationService.getReservations({ courtId: item._id, date: moment().format('DD/MM/YYYY') }).subscribe(reservation => {
          item.events = reservation.items.map(reserva => ({
            ...item,
            start: moment(`${reserva.date} ${reserva.time}`, 'DD/MM/YYYY HH:mm' ).toDate(),
            end: moment(`${reserva.date} ${reserva.time}`, 'DD/MM/YYYY HH:mm' ).add(1, 'hours').toDate(),
            cssClass: 'po-font-text-small',
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            title: this.getTitleItem(reserva),
          }))
        })
        console.log(item)
        return item
      })
     }),
    () => {
      this.poNotification.error('Erro na busca de quadras.');
      this.isHideLoading = true;
    },
    () => (this.isHideLoading = true)
  }

  showDetail() {
    return true
  }

  getTitleItem(item: IReservation) {
    const title = `${item.time} - ${item.courtId.name} - ${item.reserverId?.nome ? `Reserva de : ${item.reserverId?.nome}` : `Aula de ${item.classId?.sport} com ${item.classId?.teacherId.nome}`}`
    return title
  }
}
