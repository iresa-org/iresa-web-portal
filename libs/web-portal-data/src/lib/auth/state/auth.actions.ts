import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<any>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()
);

export const loginError = createAction('[Auth] Login Error', props<any>());

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutError = createAction('[Auth] Logout Error');
