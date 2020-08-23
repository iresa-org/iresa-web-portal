import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ALBUMS_FEATURE_KEY } from './albums.reducer';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { albumResult } from './config/album-result';
import { SpotifyService } from '@iresa/ngx-spotify';
import * as AlbumsAction from './albums.actions';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';

@Injectable()
export class AlbumsEffects {
  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsAction.loadAlbums),
      fetch({
        // provides an action
        run: (action) => {
          const useSample = action.useSample;
          if (!useSample) {
            return this.spotifyService
              .getArtistAlbums(action.artistId, { market: 'from_token' })
              .pipe(
                map((val) => AlbumsAction.albumsLoaded({ albums: val.items }))
              );
          }
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AlbumsAction.albumsLoadError(error);
        },
      })
    )
  );

  loadAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsAction.loadAlbum),
      fetch({
        // provides an action
        run: (action) => {
          const useSample = action.useSample;
          if (!useSample) {
            return this.spotifyService
              .getAlbum(action.albumId)
              .pipe(map((val) => AlbumsAction.albumLoaded({ album: [val] })));
          }

          const arr = [];
          arr.push(albumResult);
          return of(arr).pipe(
            map((val) => {
              return AlbumsAction.albumLoaded({ album: val });
            })
          );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AlbumsAction.albumLoadError(error);
        },
      })
    )
  );

  loadAlbumTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsAction.loadAlbumTracks),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const albumId = action.album.albumId;
          const album = this.findAlbum(state[ALBUMS_FEATURE_KEY].list, albumId);
          if (album) {
            if (album.tracks) {
              return AlbumsAction.setAlbumTracks({ album });
            } else {
              return this.spotifyService
                .getAlbumTracks(albumId, { market: 'from_token' })
                .pipe(
                  map((data) =>
                    AlbumsAction.setAlbumTracks({
                      album: { ...album, tracks: { items: data.items } },
                    })
                  )
                );
            }
          }
          return this.spotifyService.getAlbum(albumId).pipe(
            map((data) =>
              AlbumsAction.setAlbumTracks({
                album: data,
                trackPos: action.album.trackPos,
              })
            )
          );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AlbumsAction.albumLoadError(error);
        },
      })
    )
  );

  loadPlaylistTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsAction.loadPlaylistTracks),
      fetch({
        // provides an action
        run: (action, state) => {
          const playlistId = action.playlistId;
          return this.spotifyService.getPlaylist(playlistId).pipe(
            map((data) => {
              data.artists = [{ name: `Added by ${data.owner.display_name}` }];
              data.tracks.items = data.tracks.items.map((item) => {
                return { ...item, ...item.track };
              });

              return AlbumsAction.setAlbumTracks({
                album: data,
              });
            })
          );
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return AlbumsAction.playlistLoadError(error);
        },
      })
    )
  );

  findAlbum(list: any[], albumId) {
    return list.find((al) => al.id === albumId);
  }

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private spotifyService: SpotifyService
  ) {}
}
