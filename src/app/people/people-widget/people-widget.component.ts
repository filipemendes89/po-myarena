import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-people-widget',
  templateUrl: './people-widget.component.html',
  styleUrls: ['./people-widget.component.css'],
  inputs: ['pessoa']
})
export class PeopleWidgetComponent {
  public pessoa: any

  constructor(private _router:Router){}

  editPeople(event: any) {
    console.log(event)
    this._router.navigateByUrl(`/people/edit/${event.pessoa.id}`)
  }

}
