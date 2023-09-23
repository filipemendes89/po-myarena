import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
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
      action: (e:any) => this._router.navigateByUrl(`/class/new`),
      icon: 'po-icon-plus'
    },
    {
      label: 'Editar',
      action: (e:any) => this._router.navigateByUrl(`/court/edit/${e.id}`),
      icon: 'po-icon-edit'
    }
  ];

  public readonly literals: PoListViewLiterals = {
    showDetails: 'Mostrar agenda',
  }
  
  private serviceApi:string = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/court'

  courts: any = []
  isHideLoading = true
  
  constructor(private poNotification: PoNotificationService,private courtService: CourtService, private _router:Router) { }

  ngOnInit() {
    this.isHideLoading = false;
    this.courtService.getCourt(this.serviceApi).subscribe((data:any) => this.courts = data,
    () => {
      this.poNotification.error('Erro na busca de quadras.');
      this.isHideLoading = true;
    },
    () => (this.isHideLoading = true)
  )
  }

  showDetail() {
    return true
  }
}
