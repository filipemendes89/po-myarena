import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(public http: HttpClient) { }

  getAvailabeCourts(endpoint: string, date: string) {
    return this.http.get(`${endpoint}?date=${date}`)
  }

  getClass(endpoint: string, params?: any) {
    return this.http.get(endpoint, { params })
  }

  getClassesByDate(endpoint: string, date: string) {
    return this.http.get(endpoint, { params: {
      date
    }})
  }

  postClass(endpoint:string, _class: any) {
    return this.http.post(endpoint, _class)
  }

  deleteClass(endpoint: string, classId: string) {
    return this.http.delete(`${endpoint}/${classId}`)
  }

  updateClass(endpoint:string, updatedClass:any) {
    return this.http.put(`${endpoint}/${updatedClass._id}`, updatedClass)
  }
}
