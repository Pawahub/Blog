import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { getLoaded, getLoading, getServerError } from "../../../state-management/auth-store/auth.selectors";
import { login } from "../../../state-management/auth-store/auth.actions";

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.scss']
})

export class LoginUiComponent {

  loading$: Observable<any> = this.store$.pipe(select(getLoading));
  loaded$: Observable<any> = this.store$.pipe(select(getLoaded));
  serverError$: Observable<any> = this.store$.pipe(select(getServerError));

  constructor(private store$: Store) {
  }

  onLogin(loginPayload: { username: string, password: string }) {
    this.store$.dispatch(login(loginPayload));
  }
}
