import { Component } from '@angular/core'
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoPageAction } from '@po-ui/ng-components'
import { CourtService } from '../court.service'

@Component({
  selector: 'app-court-list',
  templateUrl: './court-list.component.html',
  styleUrls: ['./court-list.component.css'],
  providers: [CourtService]
})
export class CourtListComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Courts' }]
  }
  
  public readonly actionsPage: Array<PoPageAction> = [
    { label: 'Novo', url: '/court/new', icon: 'po-icon-plus' }
  ]
  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Aula',
      action: () => console.log(this),
      icon: 'po-icon-plus'
    },
    {
      label: 'Editar',
      action: () => console.log(this),
      icon: 'po-icon-edit'
    }
  ];

  public readonly literals: PoListViewLiterals = {
    showDetails: 'Mostrar agenda',
  }
  
  private serviceApi:string = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/court'

  courts: any = []

  
  constructor(private courtService: CourtService) { }

  ngOnInit() {
    this.courtService.getCourt(this.serviceApi).subscribe((data:any) => this.courts = data)
  }

  showDetail() {
    return true
  }
}
