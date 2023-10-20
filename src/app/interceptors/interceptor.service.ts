import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class Interceptor implements HttpInterceptor {
 intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
  request = request.clone({
      setParams: {
          code: environment.apiCode
      }
  })
  return next.handle(request);
 }
}