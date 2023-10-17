import { Component } from '@angular/core'
import { PoBreadcrumb, PoDialogService, PoNotificationService, PoPageAction } from '@po-ui/ng-components'
import {
  CalendarEvent, CalendarView
} from 'angular-calendar'
import { EventColor } from 'calendar-utils'
import {
  isSameDay,
  isSameMonth
} from 'date-fns'
import * as moment from 'moment'
import { Subject } from 'rxjs'
import { IReservation } from 'src/app/types/types'
import { ReservationService } from '../reservation.service'

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  quartiary: {
    primary: '#fff9de',
    secondary: '#fff9de',
  }
};
@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent {
  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Reservas', link: '/reservation' }, { label: 'Calendário' }]
  }

  public readonly actions: PoPageAction[] = [
    {
      icon: 'po-icon-plus',
      label: 'Nova',
      url: 'reservation/new'
    }
  ];
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: any

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  isHideLoading = true

  activeDayIsOpen: boolean = true;

  constructor(private reservationService: ReservationService, private poNotification: PoNotificationService, private poDialogService: PoDialogService) {}

  ngOnInit() {
    this.isHideLoading = false
    this.reservationService.getReservations({}).subscribe((data) => {
      this.events = data.items.sort((a:any, b:any) => {
        return moment(`${a.date} ${a.time}`, 'DD/MM/YYYY HH:mm' ).diff(moment(`${b.date} ${b.time}`, 'DD/MM/YYYY HH:mm'))
      }).map((item) => {
        return {
          ...item,
          start: moment(`${item.date} ${item.time}`, 'DD/MM/YYYY HH:mm' ).toDate(),
          end: moment(`${item.date} ${item.time}`, 'DD/MM/YYYY HH:mm' ).add(1, 'hours').toDate(),
          color: colors['yellow'],
          cssClass: 'po-font-text-small',
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
          title: this.getTitleItem(item),
          actions: [
            {
              label: '<i class="po-icon po-icon-delete"></i>',
              onClick: ({ event }: { event: any }): void => {
                this.poDialogService.alert({ title: 'Excluir', message: 'Tem certeza que deseja excluir esta reserva?', ok: () => this.deleteReservation(event._id) })
              },
            },
          ]
        }
      })
      this.isHideLoading = true
    },
    (error) => {
      this.poNotification.error(error);
      this.isHideLoading = true
    })
  }

  getTitleItem(item: IReservation) {
    const title = `${item.time} - ${item.courtId.name} - ${item.reserverId?.nome ? `Reserva de : ${item.reserverId?.nome}` : `Aula de ${item.classId?.sport} com ${item.classId?.teacherId.nome}`}`
    return title
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  deleteReservation(id: string){
    this.isHideLoading = false
    this.reservationService.deleteReservations(id).subscribe({
      complete: () => {
        this.poNotification.success('Reserva excluída com sucesso.');
        this.ngOnInit()
        this.isHideLoading = true;
      },
      error: (error) => {
        this.poNotification.error('Erro na exclusão da reserva');
        this.poNotification.error(error);
        this.isHideLoading = true;
      },
    })
  }
}