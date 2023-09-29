import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private endpoint = 'https://myarenaapi.azurewebsites.net/api/reservation'
  constructor(private http: HttpClient) { }

  getReservations(params: any) {
    return this.http.get(this.endpoint, { params })
  }

  deleteReservations(id: string) {
    return this.http.delete(`${this.endpoint}/${id}`, { body: { id }})
  }
}
