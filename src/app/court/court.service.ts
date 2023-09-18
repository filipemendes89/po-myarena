import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CourtService {

  constructor(public http: HttpClient) {}

  postCourt(endpoint: any, court: any) {
    return this.http.post(endpoint, court)
  }

  getCourt(endpoint:any) {
    return this.http.get(endpoint)
  }
}
