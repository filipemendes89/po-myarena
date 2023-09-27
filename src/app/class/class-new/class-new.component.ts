import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService, PoStepperOrientation } from '@po-ui/ng-components'
import { ClassService } from '../class.service'

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css'],
  providers: [ClassService]
})
export class ClassNewComponent {
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal
  
  public readonly breadcrumb:PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Class', link: '/class' }, 
      { label: 'New' }
    ]
  }

  public readonly fieldsSecondStep: Array<PoDynamicFormField> = [
    {
      property: 'teacherId',
      label: 'Professor',
      gridColumns: 8,
      gridSmColumns: 12,
      optionsService: 'https://myarenaapi.azurewebsites.net/api/people?tipo=Professor&code=u3FbvFbmYspLyHXrquopiRwOpSb5dtzDoLJkkuxvaeT8AzFuNmrNxw==',
      fieldLabel: 'nome',
      fieldValue: '_id', 
      required: true
    },
    {
      property: 'sport',
      divider: 'Esporte',
      label: 'Esporte',
      gridColumns: 8,
      gridSmColumns: 12,
      optional: false,
      options: ['Beach Volley', 'Futevolei', 'Beach Tennis', 'Funcional'],
      optionsMulti: false, 
      required: true
    },
    {
      property: 'level',
      label: 'Nível',
      gridColumns: 6,
      options: ['Estrente', 'Iniciante', 'Intermediário', 'Avançado', 'Particular'],
      required: true
    },
    {
      property: 'people',
      label: 'Max. Alunos',
      type: 'number',
      gridColumns: 2,
      minValue: 1,
      maxValue: 10000,
      errorMessage: 'Invalid number.', 
      required: true
    },
  ]

  readonly detailFields: Array<PoDynamicFormField> = [
    { property: 'sport', label: 'Esporte', divider: 'Dados da Aula', gridColumns: 6, required: true, readonly: true },
    { property: 'date', label: 'Data', gridColumns: 6, required: true, readonly: true },
    { property: 'time', label: 'Horário', gridColumns: 2, required: true, readonly: true },
    { property: 'court', label: 'Quadra', gridColumns: 4, required: true, readonly: true },
    { property: 'teacherId', divider: 'Detalhes', label: 'Professor', gridColumns: 6, required: true, readonly: true },
    { property: 'people', label: 'Max. Alunos', gridColumns: 2, required: true, readonly: true },
    { property: 'level', label: 'Nível', gridColumns: 4, required: true, readonly: true },
  ];

  detailValue: any = {}
  valueSecondStep: any = {}
  isHideLoading = true
  availabeCourts: any = []
  serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/availabeCourts'
  reservationApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/reservation'
  classApi = 'http://localhost:7071/api/class'

  fields: Array<PoDynamicFormField> = [
    {
      property: 'dateClass',
      label: 'Data da aula',
      type: 'date',
      format: 'dd/mm/yyyy',
      gridColumns: 3,
      gridSmColumns: 12,
      
    }]

    private createReservation(_class: any): void {
      const { courtId, time, classId, date } = _class
      const reservation = {
        courtId,
        time,
        classId,
        date,
        active: true
      }
      console.log(reservation)
      this.classService.postReservation(this.reservationApi, reservation).subscribe(
        {
          complete: () => this.poNotification.success('Reserva criada!'),
          error: (error) => this.poNotification.error(error)
        }
      )
    } 

    onFinish = () => {
      this.isHideLoading = false

      this.classService.postClass(this.classApi, this.detailValue).subscribe(
        (data: any) => {
          this.detailValue = { classId: data._id, ...this.detailValue }
          this.createReservation(this.detailValue) //to-do processar no backEnd
          this.poNotification.success('Aula criada com sucesso.')
          this._router.navigateByUrl('/class')
          this.isHideLoading = true
        },
        (error) => {
          this.poNotification.error('Erro na criação da aula')
          this.poNotification.error(error)
          this.isHideLoading = true
        })
    }

    secondStep() {
      this.detailValue = { ...this.valueSecondStep, ...this.detailValue }
    }

    canActivateNextStep(currentStep: any) { 
      return this.detailValue?.time && this.detailValue?.date && this.detailValue?.court
    }

    activateSecondStep(formSecondStep: any) {
      return formSecondStep?.form?.valid
    }

    constructor (private classService: ClassService, private _router: Router, private poNotification: PoNotificationService) {}

    getAvailabeCourts = (evento: any) => {
      this.detailValue =  { date: evento } 
      this.isHideLoading = false
      this.classService.getAvailabeCourts(this.serviceApi, evento).subscribe(
        (data:any) => this.availabeCourts = data,
        () => this.isHideLoading = true,
        () => this.isHideLoading = true)
    }

    onSelectHour = (time:any, item:any) => {
      this.detailValue = { courtId: item.courtId, court: item.courtName, time, ...this.detailValue }
    }
}
