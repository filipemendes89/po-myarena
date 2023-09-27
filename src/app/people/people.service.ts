import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

const code = 'u3FbvFbmYspLyHXrquopiRwOpSb5dtzDoLJkkuxvaeT8AzFuNmrNxw=='
@Injectable()
export class PeopleService {
  constructor(public http: HttpClient) {}

  postPerson(endpoint: any, pessoa: any) {
    return this.http.post(endpoint, pessoa, { params: {
        code
      }
    })
  }

  putPerson(endpoint: any, pessoa: any) {
    return this.http.put(endpoint, pessoa, { params: {
        code
      }
    })
  }

  getPeople(endpoint:any) {
    return this.http.get(endpoint, { params: {
        code
      }
    })
  }
}