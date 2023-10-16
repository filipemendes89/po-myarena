import { Component } from '@angular/core'
import { PoBreadcrumb, PoDialogService, PoListViewAction, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
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
  isHideLoading = true

  reserverId = this.appService.getPessoa()?._id
  isAdmin = this.appService.isAdmin()

  ngOnInit(){
    this.isHideLoading = false
    this.getReservationByDate()
  }
  
  getReservationByDate(date?: string){
    const params: { date?: string, reserverId?: string } = {}

    date ? params.date = date : null
    
    if(this.reserverId && !this.isAdmin)
      params.reserverId = this.reserverId
      
    this.isHideLoading = false
    this.reservationService.getReservations(params).subscribe({
      next: (data) => {
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
