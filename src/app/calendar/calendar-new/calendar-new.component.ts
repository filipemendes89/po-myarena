import { Component, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PoBreadcrumb, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import { FormUtils } from '@totvs-supply/sl-base-foundation'
import { CalendarService } from '../calendar.service'

@Component({
  selector: 'app-calendar-new',
  templateUrl: './calendar-new.component.html',
  styleUrls: ['./calendar-new.component.css'],
  providers: [CalendarService],
})
export class CalendarNewComponent {
  @Output()
  public descForm = <any>this.formBuilder.group({
    desc: [null, [Validators.required]],
  });
  public form = <any>this.formBuilder.array([this.createCalendarForm()]);

  endpoint =
    'https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/calendar';
  desc: string = '';
  id: any;
  isHideLoading = true;

  actions: PoPageAction[] = [
    {
      label: 'Salvar',
      action: this.onSave.bind(this),
    },
    {
      label: 'Cancelar',
      url: '/calendar',
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Calendário' },
      { label: 'Novo' },
    ],
  };

  times: any[] = [];

  constructor(
    private calendarService: CalendarService,
    public poNotification: PoNotificationService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot?.params['id'];
    if (this.id) {
      this.isHideLoading = false;
      this.calendarService.getCalendar(`${this.endpoint}/${this.id}`).subscribe(
        (data: any) => {
          this.descForm = <any>this.formBuilder.group({
            desc: [data.name, [Validators.required]],
          });
          this.form = <any>(
            this.formBuilder.array(
              data.times
                .map((time: any) => this.createCalendarForm(time))
                .concat(this.createCalendarForm())
            )
          );
        },
        () => {
          this.poNotification.error(
            `Erro na busca do calendário. Id: ${this.id}`
          );
          this.isHideLoading = true;
        },
        () => (this.isHideLoading = true)
      );
    }
  }
  onClickAdd(index: number): void {
    if (
      FormUtils.validate(...(this.form.controls as FormGroup[])) &&
      FormUtils.validate(this.descForm)
    ) {
      this.form.controls.splice(index + 1, 0, this.createCalendarForm());
    }
  }

  onSave() {
    this.times = this.form.controls
      .filter((control: FormGroup) => control.valid)
      .map((control: FormGroup) => ({
        entryTime: control.get('entryTime')?.value,
        exitTime: control.get('exitTime')?.value,
      }));

    this.desc = this.descForm.get('desc').value;

    this.calendarService
      .postCalendar(
        this.endpoint,
        {
          name: this.desc,
          times: this.times,
        },
        this.id
      )
      .subscribe({
        complete: () => {
          this.poNotification.success('Registro inserido com sucesso');
          this._router.navigateByUrl('/calendar');
        },
        error: (error) => this.poNotification.error(error),
      });
  }

  private createCalendarForm(times?: any): FormGroup {
    return this.formBuilder.group({
      entryTime: [times?.entryTime ?? null, [Validators.required]],
      exitTime: [times?.exitTime ?? null, [Validators.required]],
    }) as FormGroup;
  }
}
