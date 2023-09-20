import { Component } from '@angular/core'
import { PoDynamicFormField, PoStepperOrientation } from '@po-ui/ng-components'

@Component({
  selector: 'app-class-new',
  templateUrl: './class-new.component.html',
  styleUrls: ['./class-new.component.css']
})
export class ClassNewComponent {
  public readonly orientation:PoStepperOrientation = PoStepperOrientation.Horizontal
  fields: Array<PoDynamicFormField> = [
    {
      property: 'dateClass',
      label: 'Data da aula',
      type: 'date',
      format: 'dd/mm/yyyy',
      gridColumns: 3,
      gridSmColumns: 12,
      
    }]

    yes() {
      return true
    }

    getAvailabeHour(evento: any){
      console.log(evento)
    }
}
