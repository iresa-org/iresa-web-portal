import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import * as AuthAction from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  loggedIn$ = this.store.pipe(select(authQuery.getLoggedIn));
  loading$ = this.store.pipe(select(authQuery.getLoading));

  constructor(private store: Store<AuthPartialState>) {}

  login({ email, password }) {
    this.store.dispatch(AuthAction.login({ email, password }));
  }

  logout() {
    this.store.dispatch(AuthAction.logout());
  }
}
