import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from "../state-management/auth-store/auth.reducer";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'any'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private jwtHelperService: JwtHelperService) {
  }

  login(body: { identifier: string, password: string }) {
    return this.httpClient.post<AuthData>(
      'http://localhost:1337/api/auth/local',
      body
    ).pipe(map(res => ({
      ...res,
      ...this.jwtHelperService.decodeToken(res.jwt)
    })));
  }
}
