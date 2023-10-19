import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { IAvailableCourt, IReservation } from '../types/types'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private endpoint = `${environment.apiUrl}/reservation`
  private endPointAvailabeCourts = `${environment.apiUrl}/availabeCourts`
  constructor(private http: HttpClient) { }

  getReservations(params: any) {
    return this.http.get<{items: IReservation[]}>(this.endpoint, { params })
  }

  postReservation(body: any) {
    return this.http.post<IReservation>(this.endpoint, body)
  }
  deleteReservations(id: string) {
    return this.http.delete<IReservation>(`${this.endpoint}/${id}`, { body: { id }})
  }

  getAvailabeCourts(date: string) {
    return this.http.get<{ items: IAvailableCourt[] }>(`${this.endPointAvailabeCourts}?date=${date}`)
  }
  
}
