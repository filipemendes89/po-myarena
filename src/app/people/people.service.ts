import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { IPeople } from '../types/types'

const endpoint:string = `${environment.apiUrl}/people`
@Injectable()
export class PeopleService {
  constructor(public http: HttpClient) {}

  postPerson(pessoa: any) {
    return this.http.post<IPeople>(endpoint, pessoa)
  }

  putPerson(pessoa: any, id: string) {
    return this.http.put<IPeople>(`${endpoint}/${id}`, pessoa)
  }

  getPeople(params?:any) {
    return this.http.get<{ items: IPeople[] }>(endpoint, { params })
  }

  getPeopleById(id: string, params?:any) {
    return this.http.get<IPeople>(`${endpoint}/${id}`, { params })
  }
}