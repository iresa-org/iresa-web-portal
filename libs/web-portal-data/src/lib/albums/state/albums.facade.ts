import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AlbumsPartialState } from './albums.reducer';
import { albumsQuery } from './albums.selectors';
import * as AlbumsAction from './albums.actions';

@Injectable({
  providedIn: 'root',
})
export class AlbumsFacade {
  loaded$ = this.store.pipe(select(albumsQuery.getLoaded));
  tracksLoaded$ = this.store.pipe(select(albumsQuery.getTracksLoaded));
  allAlbums$ = this.store.pipe(select(albumsQuery.getAllAlbums));
  albumTracks$ = this.store.pipe(select(albumsQuery.getAlbumTracks));

  constructor(private store: Store<AlbumsPartialState>) {}

  loadAll(artistId) {
    this.store.dispatch(AlbumsAction.loadAlbums({ artistId }));
  }

  loadAlbum(albumId) {
    this.store.dispatch(AlbumsAction.loadAlbum({ albumId }));
  }

  loadAlbumTracks(album) {
    this.store.dispatch(AlbumsAction.loadAlbumTracks({ album }));
  }

  loadPlaylistTracks(data) {
    this.store.dispatch(AlbumsAction.loadPlaylistTracks(data));
  }
}
