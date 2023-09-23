import { Component } from '@angular/core';
import { ClassService } from '../class.service';
import { PoBreadcrumb, PoListViewAction, PoListViewLiterals, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {

  public readonly actions: PoPageAction[] = [{
    icon: 'po-icon-plus',
    label: 'Novo',
    url: 'class/new'
  }]

  readonly actionsView: Array<PoListViewAction> = [
    {
      label: 'Aluno',
      action: (e:any) => console.log(e),
      icon: 'po-icon-plus'
    },
    {
      label: 'Editar',
      action: (e:any) => this._router.navigateByUrl(`/court/class/${e.id}`),
      icon: 'po-icon-edit'
    }
  ];

  public readonly literals:PoListViewLiterals = {
    showDetails: 'Lista de alunos',
    hideDetails: 'Fechar',
    noData: 'Sem aulas'
  }

  public readonly breadcrumb:PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Class' }]
  }

  classApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/class'
  isHideLoading = true

  constructor(private classService: ClassService, private poNotification: PoNotificationService, private _router: Router) {}
  classes:any

  ngOnInit() {
    this.isHideLoading = false
    this.classService.getClass(this.classApi).subscribe(
    (data: any) => { 
      this.classes = data.items 
      this.isHideLoading = true
    }, 
    (error) => {
      this.poNotification.error(error)
      this.isHideLoading = true
    })
  }

  showDetail(e?:any) {
    console.log('a')
  }
}
