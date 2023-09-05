import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class UnitService {
  constructor(public http: HttpClient) {}

  putUnit(unit:any) {
    this.http.put('https://64f38ec0edfa0459f6c6aba4.mockapi.io/condomynium/api/v1/unit', unit).subscribe()
  }
}