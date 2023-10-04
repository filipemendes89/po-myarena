import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

const endpoint:string = `${environment.apiUrl}/court`
@Injectable({
  providedIn: 'root'
})
export class CourtService {

  constructor(public http: HttpClient) {}

  postCourt(court: any) {
    return this.http.post(endpoint, court)
  }

  putCourt(court: any, id?: string) {
    return this.http.put(`${endpoint}/${id}`, court)
  }

  getCourt(id?: string) {
    return this.http.get(`${endpoint}${id ? `/${id}` : ''}`)
  }
}
