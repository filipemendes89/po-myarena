import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private endpoint = 'https://myarenaapi.azurewebsites.net/api/reservation'
  private endPointAvailabeCourts = 'https://myarenaapi.azurewebsites.net/api/availabeCourts'
  constructor(private http: HttpClient) { }

  getReservations(params: any) {
    return this.http.get(this.endpoint, { params })
  }

  postReservation(body: any) {
    return this.http.post(this.endpoint, body)
  }
  deleteReservations(id: string) {
    return this.http.delete(`${this.endpoint}/${id}`, { body: { id }})
  }

  getAvailabeCourts(date: string) {
    return this.http.get(`${this.endPointAvailabeCourts}?date=${date}`)
  }
  
}
