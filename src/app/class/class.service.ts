import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(public http: HttpClient) { }

  getAvailabeCourts(endpoint: string, date: string) {
    return this.http.get(`${endpoint}?date=${date}`)
  }
}
