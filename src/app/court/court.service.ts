import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { ICourt } from '../types/types'

const endpoint:string = `${environment.apiUrl}/court`
@Injectable({
  providedIn: 'root'
})
export class CourtService {

  constructor(public http: HttpClient) {}

  postCourt(court: any) {
    return this.http.post<ICourt>(endpoint, court)
  }

  putCourt(court: any, id?: string) {
    return this.http.put<ICourt>(`${endpoint}/${id}`, court)
  }

  getCourt() {
    return this.http.get<{ items: ICourt[] }>(endpoint)
  }

  getCourtById(id: string, params?:any) {
    return this.http.get<ICourt>(`${endpoint}/${id}`, { params })
  }
}
