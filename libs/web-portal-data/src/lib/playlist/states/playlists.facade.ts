import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { PlaylistsPartialState } from './playlists.reducer';
import { playlistsQuery } from './playlists.selectors';
import { fromPlaylistsActions } from './playlists.actions';

@Injectable()
export class PlaylistsFacade {
  loaded$ = this.store.pipe(select(playlistsQuery.getLoaded));
  tracksLoaded$ = this.store.pipe(select(playlistsQuery.getTracksLoaded));
  favPlaylists$ = this.store.pipe(select(playlistsQuery.getFavPlaylists));
  custPlaylists$ = this.store.pipe(select(playlistsQuery.getCustPlaylists));

  constructor(private store: Store<PlaylistsPartialState>) {}

  loadAll() {
    this.store.dispatch(new fromPlaylistsActions.LoadPlaylists());
  }

  createPlaylist(data) {
    this.store.dispatch(new fromPlaylistsActions.CreatePlaylist(data));
  }

  addToPlaylist(data) {
    this.store.dispatch(new fromPlaylistsActions.AddToPlaylist(data));
  }

  getPlaylistTracks(data) {
    this.store.dispatch(new fromPlaylistsActions.GetPlaylistTracks(data));
  }

  deletePlaylistTrack(data) {
    this.store.dispatch(new fromPlaylistsActions.DeletePlaylistTrack(data));
  }

  getPlaylist(id) {
    return this.store.pipe(select(playlistsQuery.getPlaylist, { id }));
  }
}
