import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { StationsPartialState } from './stations.reducer';
import { stationsQuery } from './stations.selectors';
import * as StationsAction from './stations.actions';

@Injectable({
  providedIn: 'root',
})
export class StationsFacade {
  loaded$ = this.store.pipe(select(stationsQuery.getLoaded));
  allStations$ = this.store.pipe(select(stationsQuery.getAllStations));
  stationLoaded$ = this.store.pipe(select(stationsQuery.getStationLoaded));
  stationDetails$ = this.store.pipe(select(stationsQuery.getStationDetails));

  constructor(private store: Store<StationsPartialState>) {}

  loadAll(id) {
    this.store.dispatch(StationsAction.loadStations(id));
  }

  setSelectedId(id) {
    this.store.dispatch(StationsAction.setSelectedId({ id }));
  }

  loadStationDetails() {
    this.store.dispatch(StationsAction.loadStationDetails());
  }

  updateStationDetails(station) {
    this.store.dispatch(StationsAction.updateStationDetails({ station }));
  }
}
