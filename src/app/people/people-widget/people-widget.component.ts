import { Component } from '@angular/core'

@Component({
  selector: 'app-people-widget',
  templateUrl: './people-widget.component.html',
  styleUrls: ['./people-widget.component.css'],
  inputs: ['pessoa']
})
export class PeopleWidgetComponent {
  public pessoa: any
}
