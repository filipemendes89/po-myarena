import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class CalendarService {

  constructor(public http: HttpClient) {  }

  postCalendar(endpoint: string, calendar: any) {
    return this.http.post(endpoint, calendar)
  }
}
