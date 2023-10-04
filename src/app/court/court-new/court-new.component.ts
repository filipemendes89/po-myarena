import { Component, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb, PoDynamicFormField, PoNotificationService } from '@po-ui/ng-components'
import { environment } from 'src/environments/environment'
import { CourtService } from '../court.service'
@Component({
  selector: 'app-court-new',
  templateUrl: './court-new.component.html',
  styleUrls: ['./court-new.component.css'],
  inputs: ['court'],
})

@Inject(ActivatedRoute)
export class CourtNewComponent {
  public isHideLoading = true
  public id: any
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
    },
    {
      property: 'calendar',
      gridColumns: 6,
      gridSmColumns: 12,
      optionsService: `${environment.apiUrl}/calendar`,
      fieldLabel: 'name',
      fieldValue: '_id',
    },
  ];

  constructor(public poNotification: PoNotificationService, public courtService: CourtService, private activatedRoute: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot?.params['id']
    if (this.id) {
      this.isHideLoading = false
      this.courtService.getCourtById(this.id).subscribe((data) => this.court = data,
      () => {
        this.poNotification.error(`Erro na busca da quadra. Id: ${this.id}`);
        this.isHideLoading = true;
      },
      () => (this.isHideLoading = true))
    }
  }

  private onActionComplete = () => { 
    this.isHideLoading = true
    this.poNotification.success(`Seu registro foi criado com sucesso!`) 
    this._router.navigateByUrl('/court')
  }

  private onActionError = (error:any) => { 
    this.poNotification.error(error)
    this.isHideLoading = true
  }

  onClickSave() {
    this.isHideLoading = false
    this.court._id ? this.putCourt() : this.postCourt()
  }

  postCourt() {
    this.courtService.postCourt(this.court).subscribe(
      {
        complete: this.onActionComplete,
        error: (error) => this.onActionError(error)
      }
    );
  }

  putCourt() {
    this.courtService.putCourt(this.id, this.court).subscribe(
      {
        complete: this.onActionComplete,
        error: (error) => this.onActionError(error)
      }
    );
  }
}
