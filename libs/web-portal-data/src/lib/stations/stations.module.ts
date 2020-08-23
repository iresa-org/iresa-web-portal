import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromStations from './state/stations.reducer';
import { StationsEffects } from './state/stations.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromStations.STATIONS_FEATURE_KEY,
      fromStations.reducer
    ),
    EffectsModule.forFeature([StationsEffects]),
  ],
})
export class StationsDataModule {}
