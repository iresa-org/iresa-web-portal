import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { DASHBOARD_FEATURE_KEY } from './dashboard.reducer';
import { SpotifyService } from '@iresa/ngx-spotify';
import { map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { results } from './config/search-results';
import { DashboardService } from './dashboard.service';
import * as DashboardAction from './dashboard.actions';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';

@Injectable()
export class DashboardEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardAction.search),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          if (!state[DASHBOARD_FEATURE_KEY].useSample) {
            const type = 'track,artist,album,playlist';
            return this.spotifyService
              .search(action.search, type, { limit: 2, market: 'from_token' })
              .pipe(
                map((val) =>
                  DashboardAction.searchSuccess({
                    results: this.dbService.toSearchResult(val),
                  })
                )
              );
          }
          return of(results).pipe(
            map((val) =>
              DashboardAction.searchSuccess({
                results: this.dbService.toSearchResult(val),
              })
            )
          );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return DashboardAction.searchError();
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private spotifyService: SpotifyService,
    private store$: Store<any>,
    private dbService: DashboardService
  ) {}
}
