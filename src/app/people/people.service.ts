import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class PeopleService {
  constructor(public http: HttpClient) {}

  postPerson(endpoint: any, pessoa: any) {
    return this.http.post(endpoint, pessoa)
  }

  putPerson(endpoint: any, pessoa: any) {
    return this.http.put(endpoint, pessoa)
  }

  getPeople(endpoint:any) {
    return this.http.get(endpoint)
  }
}