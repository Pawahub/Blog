import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailed, loginSuccess } from './auth.actions';
import { catchError, delayWhen, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of, timer } from 'rxjs';
import { AuthData } from "./auth.reducer";
import { Store } from "@ngrx/store";
import { isAuth } from "./auth.selectors";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.authService.login({
      identifier: action.username,
      password: action.password
    }).pipe(
      map((loginSuccessData: AuthData) => {
        localStorage.setItem('token', loginSuccessData.jwt);
        return loginSuccess(loginSuccessData)
      }),
      catchError(response =>
        of(loginFailed({serverError: response.error.error.message}))
      )
    ))
  ));

  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    withLatestFrom(this.store$.select(isAuth)),
    filter(([, isAuth]) => !!isAuth),
    delayWhen(([authData]) => timer(5000)),
    switchMap(() => this.authService.refresh()
      .pipe(
        map((authData: AuthData) => {
          localStorage.setItem('token', authData.jwt);
          return loginSuccess(authData);
        }))
    )
  ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private store$: Store) {
  }
}
