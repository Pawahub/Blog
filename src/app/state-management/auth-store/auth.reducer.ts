import { createReducer, on } from '@ngrx/store';
import { login, loginFailed, loginSuccess } from './auth.actions';

export const AUTH_FEATURE_NAME = 'auth';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  jwt: string;
  user: User;
  id: number;
  iat: number;
  exp: number;
}

export interface AuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AuthState = {
  loaded: true,
  loading: false,
  serverError: ''
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true
  })),
  on(loginSuccess, (state, {type, ...authData}: { type: string } & AuthData) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    serverError: ''
  })),
  on(loginFailed, (state, {serverError}) => ({
    ...state,
    loaded: true,
    loading: false,
    serverError
  }))
);
