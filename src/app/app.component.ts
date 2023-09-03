import { Component } from '@angular/core'

import { PoMenuItem } from '@po-ui/ng-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', link: '/' },
    { label: 'Pessoas', link: '/people' },
    { label: 'Unidades', link: '/unit' }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
