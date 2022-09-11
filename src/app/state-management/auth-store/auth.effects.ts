import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailed, loginSuccess } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { AuthData } from "./auth.reducer";

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.authService.login({
      identifier: action.username,
      password: action.password
    }).pipe(
      map((loginSuccessData: AuthData) => loginSuccess(loginSuccessData)),
      catchError(
        response => of(loginFailed({
          serverError: response.error.error.message
        }))
      )
    ))
  ));

  constructor(private actions$: Actions,
              private authService: AuthService) {
  }
}
