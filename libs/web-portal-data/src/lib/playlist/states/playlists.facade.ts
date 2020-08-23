import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { PlaylistsPartialState } from './playlists.reducer';
import { playlistsQuery } from './playlists.selectors';
import * as PlaylistsAction from './playlists.actions';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsFacade {
  loaded$ = this.store.pipe(select(playlistsQuery.getLoaded));
  tracksLoaded$ = this.store.pipe(select(playlistsQuery.getTracksLoaded));
  favPlaylists$ = this.store.pipe(select(playlistsQuery.getFavPlaylists));
  custPlaylists$ = this.store.pipe(select(playlistsQuery.getCustPlaylists));

  constructor(private store: Store<PlaylistsPartialState>) {}

  loadAll() {
    this.store.dispatch(PlaylistsAction.loadPlaylists());
  }

  createPlaylist(playlist) {
    this.store.dispatch(PlaylistsAction.createPlaylist({ playlist }));
  }

  addToPlaylist(data) {
    this.store.dispatch(PlaylistsAction.addToPlaylist(data));
  }

  getPlaylistTracks(id) {
    this.store.dispatch(PlaylistsAction.getPlaylistTracks({ id }));
  }

  deletePlaylistTrack(data) {
    this.store.dispatch(PlaylistsAction.deletePlaylistTrack(data));
  }

  getPlaylist(id) {
    return this.store.pipe(select(playlistsQuery.getPlaylist, { id }));
  }
}
