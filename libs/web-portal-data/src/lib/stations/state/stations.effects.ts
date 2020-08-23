import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { StationsService } from './stations.service';
import { map, withLatestFrom } from 'rxjs/operators';
import * as StationsAction from './stations.actions';
import { fetch } from '@nrwl/angular';
import { STATIONS_FEATURE_KEY } from './stations.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class StationsEffects {
  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsAction.loadStations),
      fetch({
        // provides an action
        run: (action, state) => {
          return this.stationsService
            .getStationsByUser(action)
            .pipe(
              map((data) => StationsAction.stationsLoaded({ stations: data }))
            );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return StationsAction.stationsLoadError(error);
        },
      })
    )
  );

  loadStation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsAction.loadStationDetails),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const id = state[STATIONS_FEATURE_KEY].selectedId;
          const station = state[STATIONS_FEATURE_KEY].stationDetails;
          if (station) {
            return StationsAction.stationDetailsLoaded({ station });
          }
          return this.stationsService
            .getStationDetails(id)
            .pipe(
              map((data) =>
                StationsAction.stationDetailsLoaded({ station: data })
              )
            );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return StationsAction.stationDetailsLoadError();
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private stationsService: StationsService
  ) {}
}
