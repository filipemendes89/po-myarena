import { Component } from '@angular/core'
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components'

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent {
  public readonly actions: PoPageAction[] = [
    {
      label: 'Novo',
      url: '/calendar/new'
    }
  ]

  public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Home', link: '/' }, { label: 'Calendario' }]
  }
}
