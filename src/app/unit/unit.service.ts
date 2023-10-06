import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

const endpoint = `${environment.apiUrl}/sport`

@Injectable()
export class UnitService {
  constructor(public http: HttpClient) {}

  getSports(): Observable<any> {
    return this.http.get(endpoint)
  }
}