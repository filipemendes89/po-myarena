import { Component } from '@angular/core';
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components';
import { CourtService } from '../court.service';

@Component({
  selector: 'app-court-new',
  templateUrl: './court-new.component.html',
  styleUrls: ['./court-new.component.css'],
  inputs: ['court']
})
export class CourtNewComponent {
  public readonly serviceApi = 'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/court';
  public isHideLoading = true

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Court', link: '/court' },
      { label: 'New' }
    ]
  };

  public court:any = {}

  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'active', gridColumns: 6, type: 'boolean', booleanTrue: 'Sim', booleanFalse: 'Não', label: 'Ativa' },
    { property: 'type',divider: 'Tipo', options: ['Quadra Poliesportiva', 'Quadra Areia', 'Campo'], gridColumns: 6, label: 'Tipo' },
    { property: 'name', divider: 'Dados Pessoais', required: true, label: "Nome" },
    {
      property: 'avatar',
      type: 'upload',
      gridColumns: 12,
      gridSmColumns: 12,
      label: 'Avatar',
      optional: true,
      url: 'https://po-sample-api.fly.dev/v1/uploads/addFile',
      hideSendButton: true
    },
    {
      property: 'sports',
      divider: 'Esportes',
      label: 'Esportes',
      gridColumns: 6,
      gridSmColumns: 12,
      optional: false,
      options: ['Beach Volley', 'Futevolei', 'Beach Tennis', 'Funcional'],
      optionsMulti: true,
    }
  ];

  constructor(public poNotification: PoNotificationService, public courtService: CourtService) {
  }

  private onActionComplete = () => { 
    this.isHideLoading = true
    this.poNotification.success(`Seu registro foi criado com sucesso!`) 
  }

  private onActionError = (error:any) => { 
    this.poNotification.error(error)
    this.isHideLoading = true
  }

  onClickSave() {
    this.isHideLoading = false
    this.courtService.postCourt(this.serviceApi, this.court).subscribe(
      {
        complete: this.onActionComplete,
        error: (error) => this.onActionError(error)
      }
    );
  }
}
