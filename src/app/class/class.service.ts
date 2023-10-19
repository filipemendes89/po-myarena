import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { IAvailableCourt, IClass } from '../types/types'

const endpoint = `${environment.apiUrl}/class`
const endpointAvailableCourts = `${environment.apiUrl}/availabeCourts`
@Injectable({
  providedIn: 'root'
})

export class ClassService {

  constructor(public http: HttpClient) { }

  getAvailabeCourts(date: string) {
    return this.http.get<{items: IAvailableCourt[]}>(`${endpointAvailableCourts}?date=${date}`)
  }

  getClass(params?: any) {
    return this.http.get<{items: IClass[]}>(endpoint, { params })
  }

  getClassById(id: string,params?: any) {
    return this.http.get<IClass>(`${endpoint}/${id}`, { params })
  }

  postClass(_class: any) {
    return this.http.post<IClass>(endpoint, _class)
  }

  deleteClass(classId: string) {
    return this.http.delete<IClass>(`${endpoint}/${classId}`)
  }

  updateClass(updatedClass:any) {
    return this.http.put<IClass>(`${endpoint}/${updatedClass._id}`, updatedClass)
  }
}
