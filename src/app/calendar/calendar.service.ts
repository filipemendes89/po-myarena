import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class CalendarService {

  constructor(public http: HttpClient) {  }

  postCalendar(endpoint: string, calendar: any, id?: string) {
    return id ? this.http.put(`${endpoint}/${id}`, calendar) : this.http.post(endpoint, calendar)
  }

  getCalendar(endpoint: string) {
    return this.http.get(endpoint)
  }
}
