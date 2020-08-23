import { createReducer, on, Action } from '@ngrx/store';
import * as AuthAction from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface AuthState {
  loggedIn: boolean;
  user: any;
  loading: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null,
  loading: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthAction.login, (state, payload) => ({
    ...state,
    loading: true,
  })),
  on(AuthAction.loginSuccess, (state, payload) => ({
    ...state,
    loggedIn: true,
    user: payload.user,
    loading: false,
  })),
  on(AuthAction.logoutSuccess, (state, payload) => ({
    ...state,
    loggedIn: false,
    user: null,
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
