import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, filter, Observable, switchMap, take} from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {TokenService} from "./token.service";
import {AuthService} from "./auth.service";


const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private tokenService: TokenService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<object>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if(token != null) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      console.log(authReq.url);
        if(!authReq.url.includes("auth/logout") && error.status === 401){
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler){
    console.log(this.isRefreshing);
    if(!this.isRefreshing) {
      console.log("Refreshing ...");
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();
      if(token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token.access);
            this.refreshTokenSubject.next(token.access);

            return next.handle(this.addTokenHeader(request, token.access));
          }),
          catchError((err) => {
            if(err.status === 401) {
              this.isRefreshing = false;
              this.tokenService.logOut();
            }
            return throwError(err);
          })
        );
      }
    }
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)});
  }
}
