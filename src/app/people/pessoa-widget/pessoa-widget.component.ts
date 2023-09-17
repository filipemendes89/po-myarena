import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoa-widget',
  templateUrl: './pessoa-widget.component.html',
  styleUrls: ['./pessoa-widget.component.css'],
  inputs: ['pessoa']
})
export class PessoaWidgetComponent {
  public pessoa: any
}
