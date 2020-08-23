import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { stations } from './stations';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor() {}

  getStationsByUser(uid) {
    return of(stations);
  }

  getStationDetails(stationId) {
    return of(stations.find((station) => station.id === stationId));
  }
}
