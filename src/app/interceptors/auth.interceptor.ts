import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, switchMap } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { getAccessToken } from "../state-management/auth-store/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store$: Store) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      switchMap(token => {
        const authRequest = token
          ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}})
          : request;

        return next.handle(authRequest).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log('Redirect on login page OR sign out');
                return EMPTY;
              }
            }
            throw err;
          })
        );
      })
    )
  }
}
