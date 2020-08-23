import { createAction, props } from '@ngrx/store';

export const loadStations = createAction(
  '[Stations] Load Stations',
  props<any>()
);

export const stationsLoaded = createAction(
  '[Stations] Stations Loaded',
  props<{ stations: any[] }>()
);

export const stationsLoadError = createAction(
  '[Stations] Stations Load Error',
  props<any>()
);

export const setSelectedId = createAction(
  '[Stations] Set Selected Id',
  props<{ id: string }>()
);

export const loadStationDetails = createAction(
  '[Stations] Load Station Details'
);

export const stationDetailsLoaded = createAction(
  '[Stations] Station Details Loaded',
  props<{ station: any }>()
);

export const stationDetailsLoadError = createAction(
  '[Stations] Station Details Load Error'
);

export const updateStationDetails = createAction(
  '[Stations] Update Station Details',
  props<{ station }>()
);
