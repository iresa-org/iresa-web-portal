import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { PLAYLISTS_FEATURE_KEY } from './playlists.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { PlaylistsService } from './playlists.service';
import { STATIONS_FEATURE_KEY } from '../../stations/state/stations.reducer';
import { random } from '@iresa/shared/utilities';
import * as PlaylistsAction from './playlists.actions';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';

@Injectable()
export class PlaylistsEffects {
  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsAction.loadPlaylists),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const stationId = state[STATIONS_FEATURE_KEY].selectedId;
          const playlists = state[PLAYLISTS_FEATURE_KEY].list;
          if (playlists.length === 0) {
            return this.playlistsService
              .getPlaylists(stationId)
              .pipe(
                map((data) =>
                  PlaylistsAction.playlistsLoaded({ playlists: data })
                )
              );
          }
          return PlaylistsAction.playlistsLoaded({ playlists });
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return PlaylistsAction.playlistsLoadError(error);
        },
      })
    )
  );

  savePlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsAction.createPlaylist),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const stationId = state[STATIONS_FEATURE_KEY].selectedId;
          const id = random(12);
          return PlaylistsAction.createPlaylistSuccess({
            id,
            stationId,
            ...action,
            tracks: [],
          });
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return PlaylistsAction.createPlaylistError(error);
        },
      })
    )
  );

  getPlaylistTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsAction.getPlaylistTracks),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const stationId = state[STATIONS_FEATURE_KEY].selectedId;
          const playlist = state[PLAYLISTS_FEATURE_KEY].list.find(
            (item) => item.id === action.id
          );
          return this.playlistsService
            .getPlaylistTracks(stationId, playlist)
            .pipe(
              map((tracks) =>
                PlaylistsAction.getPlaylistTracksSuccess({
                  playlist,
                  tracks,
                })
              )
            );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return PlaylistsAction.getPlaylistTracksError();
        },
      })
    )
  );

  getPlaylistIdx(prev, length) {
    const idx = Math.floor(Math.random() * length);
    if (idx === prev) {
      return this.getPlaylistIdx(prev, length);
    }
    return idx;
  }

  constructor(
    private actions$: Actions,
    private playlistsService: PlaylistsService,
    private store$: Store<any>
  ) {}
}
