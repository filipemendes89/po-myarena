import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService, PoSelectOption, PoStepperOrientation } from '@po-ui/ng-components'
import { Level } from 'src/app/people/people-widget/people-widget.component'
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

  public readonly optionsLevel: PoSelectOption[] = [
    { label: 'Estreante', value: Level.Estreante },
    { label: 'Iniciante', value: Level.Iniciante },
    { label: 'Intermediario', value: Level.Intermediário },
    { label: 'Avançado', value: Level.Avançado },
    { label: 'Particular', value: 5 }
  ]

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
      optionsService: `${environment.apiUrl}/sport`,
      fieldLabel: 'name',
      fieldValue: 'name',
      optionsMulti: false, 
      required: true
    },
    {
      property: 'level',
      label: 'Nível',
      gridColumns: 6,
      gridSmColumns: 6,
      options: this.optionsLevel,
      required: true
    },
    {
      property: 'people',
      label: 'Max. Alunos',
      type: 'number',
      gridColumns: 2,
      gridSmColumns: 6,
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
    { property: 'people', label: 'Max. Alunos', gridSmColumns: 12, gridColumns: 2, required: true, readonly: true },
    { property: 'level', label: 'Nível', gridSmColumns: 12, required: true, readonly: true, options: this.optionsLevel },
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
