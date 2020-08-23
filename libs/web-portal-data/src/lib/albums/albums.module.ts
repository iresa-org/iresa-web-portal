import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAlbums from './state/albums.reducer';
import { AlbumsEffects } from './state/albums.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAlbums.ALBUMS_FEATURE_KEY, fromAlbums.reducer),
    EffectsModule.forFeature([AlbumsEffects]),
  ],
})
export class AlbumsDataModule {}
