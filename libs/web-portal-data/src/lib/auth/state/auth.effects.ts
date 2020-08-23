import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthAction from './auth.actions';
import { fetch } from '@nrwl/angular';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.login),
      fetch({
        // provides an action
        run: (action) => {
          return this.authService
            .login(action)
            .pipe(map((data) => AuthAction.loginSuccess(data)));
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AuthAction.loginError(error);
        },
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.logout),
      fetch({
        // provides an action
        run: (action) => {
          this.router.navigateByUrl('/login');
          return AuthAction.logoutSuccess();
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AuthAction.logoutError();
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
