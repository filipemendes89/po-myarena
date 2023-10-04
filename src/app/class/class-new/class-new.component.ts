import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService, PoStepperOrientation } from '@po-ui/ng-components'
import { IAvailableCourt, IHour } from 'src/app/types/types'
import { environment } from 'src/environments/environment'
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
      optionsService: `${environment.apiUrl}/people?tipo=Professor`,
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
  availabeCourts: IAvailableCourt[] = []

  fields: Array<PoDynamicFormField> = [
    {
      property: 'dateClass',
      label: 'Data da aula',
      type: 'date',
      format: 'dd/mm/yyyy',
      gridColumns: 3,
      gridSmColumns: 12,
      
    }]

    onFinish = () => {
      this.isHideLoading = false

      this.classService.postClass(this.detailValue).subscribe(
        (data) => {
          this.detailValue = { classId: data._id, ...this.detailValue }
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

    canActivateNextStep() { 
      return this.detailValue?.time && this.detailValue?.date && this.detailValue?.court
    }

    activateSecondStep(formSecondStep: PoDynamicFormComponent) {
      return formSecondStep?.form?.valid
    }

    constructor (private classService: ClassService, private _router: Router, private poNotification: PoNotificationService) {}

    getAvailabeCourts = (date: string) => {
      this.detailValue =  { date } 
      this.isHideLoading = false
      this.classService.getAvailabeCourts(date).subscribe(
        (data) => this.availabeCourts = data.items,
        () => this.isHideLoading = true,
        () => this.isHideLoading = true)
    }

    onSelectHour = (time: IHour, item: IAvailableCourt) => {
      this.detailValue = { courtId: item.courtId, court: item.courtName, time: time.entryTime, ...this.detailValue }
    }
}
