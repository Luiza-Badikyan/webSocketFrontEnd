// import { Injectable } from "@angular/core";
// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { AuthService } from "./auth.service";
// import { Observable } from "rxjs/internal/Observable";
// import { catchError } from "rxjs/operators";
// import { Router } from "@angular/router";
// import { throwError } from "rxjs/internal/observable/throwError";
//
// @Injectable()
// export class HttpMainInterceptor implements HttpInterceptor {
//     private AUTH_HEADER: string = 'Authorization';
//     private token: string;
//
//     constructor(private router: Router) {
//
//     }
//
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         this.token = localStorage.getItem('token');
//         request = this.addAuthenticationToken(request);
//         return next.handle(request).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 if (error.status === 401) {
//                     localStorage.removeItem('token');
//                     this.router.navigate(['/login']);
//                 }
//                 return throwError(error);
//             })
//         )
//     }
//
//     private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
//         if (!this.token) {
//             return request;
//         }
//         return request.clone({
//             headers: request.headers.set(this.AUTH_HEADER, `Bearer ` + this.token)
//         });
//     }
// }



import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class HttpMainInterceptor implements HttpInterceptor {
    private AUTH_HEADER = 'Authorization';
    private token: string;

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('token');

        request = this.addAuthenticationToken(request);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        if (!this.token) {
            return request;
        }

        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
        });
    }
}