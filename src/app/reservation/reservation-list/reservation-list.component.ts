import { Component } from '@angular/core'
import { PoBreadcrumb, PoListViewAction, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import * as moment from 'moment'
import { AppService } from 'src/app/app.service'
import { ReservationService } from '../reservation.service'

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  constructor(private appService: AppService, private reservationService: ReservationService, private poNotification: PoNotificationService) { }
  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Nova',
      url: 'reservation/new'
    },
  ];

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Excluir',
      action: (e: any) => this.deleteReservation(e._id), //Excluir reserva no backend
      icon: 'po-icon-delete',
      type: 'danger',
      visible: this.appService.isAdmin()
    }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Reservas' }]
  }

  reservations:any
  isHideLoading = true

  ngOnInit(){
    this.isHideLoading = false
    this.reservationService.getReservations(moment(new Date()).format('DD/MM/YYYY')).subscribe({
      next: (data: any) => {
        this.reservations = data.items;
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    })
  }
  getReservationByDate(date: string){
    this.isHideLoading = false
    this.reservationService.getReservations({ date }).subscribe({
      next: (data: any) => {
        this.reservations = data.items;
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
}
