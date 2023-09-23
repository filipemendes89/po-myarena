import { Component } from '@angular/core'
import { PoDynamicFormField, PoDynamicViewField, PoStepperOrientation } from '@po-ui/ng-components'
import { ClassService } from '../class.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css'],
  providers: [ClassService]
})
export class ClassNewComponent {
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal

  public readonly fieldsSecondStep: Array<PoDynamicFormField> = [
    {
      property: 'teacher',
      label: 'Professor',
      gridColumns: 8,
      gridSmColumns: 12,
      optionsService: 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/people?tipo=Professor',
      fieldLabel: 'nome',
      fieldValue: 'id', 
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
      property: 'people',
      label: 'Max. Alunos',
      type: 'number',
      gridColumns: 2,
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
    { property: 'teacher', divider: 'Detalhes', label: 'Professor', gridColumns: 6, required: true, readonly: true },
    { property: 'people', label: 'Max. Alunos', gridColumns: 2, required: true, readonly: true },
  ];

  detailValue: any = {}
  valueSecondStep: any = {}
  isHideLoading = true
  availabeCourts: any = []
  serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/availabeCourts'
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
      //this.validClass(this.detailValue)
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

    constructor (private classService: ClassService, private _router: Router) {}

    getAvailabeCourts = (evento: any) => {
      this.detailValue =  { date: evento } 
      this.isHideLoading = false
      this.classService.getAvailabeCourts(this.serviceApi, evento).subscribe(
        (data:any) => this.availabeCourts = data,
        () => this.isHideLoading = true,
        () => this.isHideLoading = true)
    }

    onSelectHour = (time:any, item:any) => {
      this.detailValue = { court: item.courtName, time, ...this.detailValue }
    }
}
