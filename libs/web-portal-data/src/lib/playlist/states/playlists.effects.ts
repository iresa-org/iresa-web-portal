import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import {
  PlaylistsPartialState,
  PLAYLISTS_FEATURE_KEY
} from './playlists.reducer';
import {
  LoadPlaylists,
  PlaylistsActionTypes,
  fromPlaylistsActions,
  GetPlaylistTracks,
  CreatePlaylist
} from './playlists.actions';
import { map } from 'rxjs/operators';
import { PlaylistsService } from './playlists.service';
import { STATIONS_FEATURE_KEY } from '../../stations/state/stations.reducer';
import { random } from '@iresa/shared/utilities';

@Injectable()
export class PlaylistsEffects {
  @Effect() loadPlaylists$ = this.dataPersistence.fetch(
    PlaylistsActionTypes.LoadPlaylists,
    {
      run: (action: LoadPlaylists, state: PlaylistsPartialState) => {
        const stationId = state[STATIONS_FEATURE_KEY].selectedId;
        const list = state[PLAYLISTS_FEATURE_KEY].list;
        if (list.length === 0) {
          return this.playlistsService
            .getPlaylists(stationId)
            .pipe(map(data => new fromPlaylistsActions.PlaylistsLoaded(data)));
        }
        return new fromPlaylistsActions.PlaylistsLoaded(list);
      },

      onError: (action: LoadPlaylists, error) => {
        console.error('Error', error);
        return new fromPlaylistsActions.PlaylistsLoadError(error);
      }
    }
  );

  @Effect() savePlaylist$ = this.dataPersistence.optimisticUpdate(
    PlaylistsActionTypes.CreatePlaylist,
    {
      run: (action: CreatePlaylist, state: PlaylistsPartialState) => {
        const stationId = state[STATIONS_FEATURE_KEY].selectedId;
        const id = random(12);
        return new fromPlaylistsActions.CreatePlaylistSuccess({
          id,
          stationId,
          ...action.payload,
          tracks: []
        });
      },

      undoAction: (action: CreatePlaylist, error) => {
        return new fromPlaylistsActions.CreatePlaylistError(error);
      }
    }
  );

  @Effect() getPlaylistTracks$ = this.dataPersistence.fetch(
    PlaylistsActionTypes.GetPlaylistTracks,
    {
      run: (action: GetPlaylistTracks, state: PlaylistsPartialState) => {
        const stationId = state[STATIONS_FEATURE_KEY].selectedId;
        const playlist = state[PLAYLISTS_FEATURE_KEY].list.find(
          item => item.id === action.payload
        );
        return this.playlistsService
          .getPlaylistTracks(stationId, playlist)
          .pipe(
            map(
              tracks =>
                new fromPlaylistsActions.GetPlaylistTracksSuccess({
                  ...playlist,
                  tracks
                })
            )
          );
      },

      onError: (action: GetPlaylistTracks, error) => {
        console.error('Error', error);
        return new fromPlaylistsActions.GetPlaylistTracksError();
      }
    }
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
    private dataPersistence: DataPersistence<PlaylistsPartialState>
  ) {}
}
