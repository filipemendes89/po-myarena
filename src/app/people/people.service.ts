import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

const endpoint:string = `${environment.apiUrl}/people`
@Injectable()
export class PeopleService {
  constructor(public http: HttpClient) {}

  postPerson(pessoa: any) {
    return this.http.post(endpoint, pessoa)
  }

  putPerson(pessoa: any, id: string) {
    return this.http.put(`${endpoint}/${id}`, pessoa)
  }

  getPeople(id?: string, params?:any) {
    return this.http.get(`${endpoint}${id ? `/${id}` : ''}`, { params })
  }
}