import { Component } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent {
  public readonly breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Estoque' }]
  }

  public readonly actions: Array<PoPageAction> = [
    { label: 'Nova entrada', url: '/documentation' },
    { label: 'Nova Saída' }
  ]
}
