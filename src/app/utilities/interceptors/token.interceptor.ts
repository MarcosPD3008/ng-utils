import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // Change this to your token getter
    get token(): string {
        return sessionStorage.getItem('token')! === null || typeof sessionStorage.getItem('token') === undefined 
            ? '' 
            : sessionStorage.getItem('token')!;
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = request.headers.set('Authorization', `Bearer ${this.token}`);

        const requestClone: HttpRequest<any> = request.clone({
        headers
        });

        return next.handle(requestClone);
    }
}
