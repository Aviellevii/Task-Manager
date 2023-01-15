import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './Services/user.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user = this.userService.curnnetUser;

    if(user.token){
      request = request.clone({
        setHeaders:{
          Authorization:user.token
        }
      })
    }
    return next.handle(request);
  }
}
