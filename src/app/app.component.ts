import { Component } from '@angular/core'

import { PoMenuItem } from '@po-ui/ng-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/', icon: 'po-icon-home', shortLabel: 'Início' },
    { label: 'Pessoas', link: '/people', icon: 'po-icon-user', shortLabel: 'Pessoas' },
    { label: 'Aulas', link: '/class', icon: 'po-icon-calendar-ok', shortLabel: 'Aulas' },
    { label: 'Quadras', link: '/court', icon: 'po-icon-target', shortLabel: 'Quadras' },
    { label: 'Calendários', link: '/calendar', icon: 'po-icon-calendar', shortLabel: 'Calendários' },
    { label: 'Estoque', link: '/object', icon: 'po-icon-stock', shortLabel: 'Estoque' }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
