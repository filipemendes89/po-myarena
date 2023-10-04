import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

const endpoint = `${environment.apiUrl}/calendar`
@Injectable()
export class CalendarService {

  constructor(public http: HttpClient) {  }

  postCalendar(calendar: any, id?: string) {
    return id ? this.http.put(`${endpoint}/${id}`, calendar) : this.http.post(endpoint, calendar)
  }

  getCalendar(id?: string) {
    return this.http.get(`${endpoint}${id ? `/${id}` : ''}`)
  }

  deleteCalendar(calendar: any){
    return this.http.delete(`${endpoint}/${calendar.id}`, calendar)
  }
}
