import * as StationsAction from './stations.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const STATIONS_FEATURE_KEY = 'stations';

/**
 * Interface for the 'Stations' data used in
 *  - StationsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface StationsState {
  list: any[]; // list of Stations; analogous to a sql normalized table
  selectedId?: string | number; // which Stations record has been selected
  loaded: boolean; // has the Stations list been loaded
  error?: any; // last none error (if any)
  stationLoaded: boolean;
  stationDetails: any;
}

export interface StationsPartialState {
  readonly [STATIONS_FEATURE_KEY]: StationsState;
}

export const initialState: StationsState = {
  list: [],
  loaded: false,
  stationLoaded: false,
  stationDetails: null,
};

const stationsReducer = createReducer(
  initialState,
  on(StationsAction.stationsLoaded, (state, payload) => {
    const s = null;
    return {
      ...state,
      list: payload.stations,
      loaded: true,
    };
  }),
  on(StationsAction.setSelectedId, (state, payload) => ({
    ...state,
    selectedId: payload.id,
  })),
  on(StationsAction.loadStationDetails, (state, payload) => ({
    ...state,
    stationLoaded: false,
  })),
  on(StationsAction.stationDetailsLoaded, (state, payload) => ({
    ...state,
    stationLoaded: true,
    stationDetails: payload.station,
  })),
  on(StationsAction.updateStationDetails, (state, payload) => ({
    ...state,
    stationDetails: { ...state.stationDetails, ...payload.station },
  }))
);

export function reducer(state: StationsState | undefined, action: Action) {
  return stationsReducer(state, action);
}
