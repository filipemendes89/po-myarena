import { Component } from '@angular/core'
import { PoBreadcrumb, PoDialogService, PoListViewAction, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import * as moment from 'moment'
import { AppService } from 'src/app/app.service'
import { ReservationService } from '../reservation.service'
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  constructor(
    private appService: AppService, 
    private reservationService: ReservationService, 
    private poNotification: PoNotificationService,
    private poDialogService: PoDialogService
    ) { }
  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Nova',
      url: 'reservation/new'
    },
    {
      icon: 'po-icon-calendar-ok',
      label: 'Calendário',
      url: 'reservation/calendar'
    }
  ];

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Excluir',
      action: (e: any) => {
        this.poDialogService.alert({ title: 'Excluir', message: 'Tem certeza que deseja excluir esta reserva?', ok: () => this.deleteReservation(e._id) })
      },
      icon: 'po-icon-delete',
      type: 'danger'
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Reservas' }]
  }

  reservations:any
  currentYear = moment().format('YYYY')
  currentMonth = moment().format('MMM')
  currentDay = moment().format('DD/MM/YYYY')
  
  isHideLoading = true

  reserverId = this.appService.getPessoa()?._id
  isAdmin = this.appService.isAdmin()

  ngOnInit(){
    this.isHideLoading = false
    this.getReservationByDate()
  }
  
  getReservationByDate(date?: string){
    const params: { date?: string, reserverId?: string } = {}

    if (date) {
      params.date = date
      this.currentYear = moment(date, 'DD/MM/YYYY').format('YYYY')
      this.currentMonth = moment(date, 'DD/MM/YYYY').format('MMM')
      this.currentDay = moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY')
    }
      
    if(this.reserverId && !this.isAdmin)
      params.reserverId = this.reserverId
      
    this.isHideLoading = false
    this.reservationService.getReservations(params).subscribe({
      next: (data) => {
        this.reservations = data.items.map((reservation:any) => {
          reservation.year = moment(reservation.date, 'DD/MM/YYYY').format('YYYY')
          reservation.month = moment(reservation.date, 'DD/MM/YYYY').format('MMM')
          return reservation
        }).sort((a:any, b:any) => {
          return moment(`${a.date} ${a.time}`, 'DD/MM/YYYY HH:mm' ).diff(moment(`${b.date} ${b.time}`, 'DD/MM/YYYY HH:mm'))
        });
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    })
  }

  deleteReservation(id: string){
    this.isHideLoading = false
    this.reservationService.deleteReservations(id).subscribe({
      complete: () => {
        this.poNotification.success('Reserva excluída com sucesso.');
        this.ngOnInit()
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error('Erro na exclusão da reserva');
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    })
  }

  filterByDate(date: string){
    return this.reservations.filter((reservation:any) => {
      return reservation.date === date
    })
  }

  getReservationYear(reservations: any): any {
    const years = new Set(reservations?.map((reservation:any) => {
      return reservation.year
    }) ?? [])

    return years
  }

  getReservationMonth(reservations: any, year: string): any {
    const months = new Set(reservations?.filter((r: any) => r.year === year).map((reservation:any) => {
      return reservation.month
    }) ?? [])

    return months
  }
  getReservationsByYear(year: string):any {
    return new Set(this.reservations.filter((reservation:any) => {
      return reservation.year === year
    }) ?? [])
  }

  getReservationDate(reservations: any, month: string):any {
    return new Set(reservations.filter((reservation:any) => {
      return reservation.month === month
    }).map((reservation:any) => {
      return reservation.date
    }) ?? [])
  }
}
