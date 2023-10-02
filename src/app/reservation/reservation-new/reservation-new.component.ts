import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService, PoStepperOrientation } from '@po-ui/ng-components'
import { AppService } from 'src/app/app.service'
import { ReservationService } from '../reservation.service'

@Component({
  selector: 'app-reservation-new',
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.css']
})
export class ReservationNewComponent {
  constructor(private reservationService: ReservationService, private poNotification: PoNotificationService, private _router: Router, private appService: AppService) {}
  
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal
  
  public readonly breadcrumb:PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Reservation', link: '/reservation' }, 
      { label: 'New' }
    ]
  }

  readonly detailFields: Array<PoDynamicFormField> = [
    { property: 'date', label: 'Data', gridColumns: 6, gridSmColumns: 8, required: true, readonly: true },
    { property: 'time', label: 'Horário', gridSmColumns: 4, gridColumns: 2, required: true, readonly: true },
    { property: 'court', label: 'Quadra', gridSmColumns: 12,gridColumns: 4, required: true, readonly: true },
    { 
      property: 'reserverId', 
      label: 'Reservado por', 
      gridSmColumns: 12, 
      gridColumns: 4, 
      required: true, 
      readonly: !this.appService.isAdmin(), 
      searchService: 'htts://myarenaapi.azurewebsites.net/api/people', 
      fieldLabel: 'nome', 
      fieldValue: '_id',
      columns: [
        { property: 'nome' },
        { property: 'cpf'}
        
      ],
      disabled: !this.appService.isAdmin()
    },
  ];

  reserverId = this.appService.getPessoa()?._id
  detailValue: any = {
    reserverId: this.reserverId
  }
  isHideLoading = true
  availabeCourts: any = []
  

  canActivateNextStep(currentStep: any) { 
    return this.detailValue?.time && this.detailValue?.date && this.detailValue?.court
  }

  getAvailabeCourts = (date: any) => {
    this.detailValue =  { date, ...this.detailValue } 
    this.isHideLoading = false
    this.reservationService.getAvailabeCourts(date).subscribe(
      (data:any) => this.availabeCourts = data.items,
      () => this.isHideLoading = true,
      () => this.isHideLoading = true)
  }

  onSelectHour = (time:any, item:any) => {
    this.detailValue = { courtId: item.courtId, court: item.courtName, time: time.entryTime, ...this.detailValue }
  }

  onFinish = () => {
    this.isHideLoading = false

    this.reservationService.postReservation(this.detailValue).subscribe(
      (data: any) => {
        this.detailValue = { classId: data._id, ...this.detailValue }
        this.poNotification.success('Reserva criada com sucesso.')
        this._router.navigateByUrl('/reservation')
        this.isHideLoading = true
      },
      (error:any) => {
        this.poNotification.error('Erro na criação da reserva')
        this.poNotification.error(error)
        this.isHideLoading = true
      })
  }
}
