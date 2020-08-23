import * as AlbumsAction from './albums.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const ALBUMS_FEATURE_KEY = 'albums';

/**
 * Interface for the 'Albums' data used in
 *  - AlbumsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface AlbumsState {
  useSample: boolean;
  list: any[]; // list of Albums; analogous to a sql normalized table
  selectedId?: string | number; // which Albums record has been selected
  loaded: boolean; // has the Albums list been loaded
  error?: any; // last none error (if any)
  trackList: any;
  tracksLoaded: boolean;
  trackPos: number;
}

export interface AlbumsPartialState {
  readonly [ALBUMS_FEATURE_KEY]: AlbumsState;
}

export const initialState: AlbumsState = {
  useSample: false,
  list: [],
  loaded: false,
  trackList: null,
  tracksLoaded: false,
  trackPos: -1,
};

const albumsReducer = createReducer(
  initialState,
  on(AlbumsAction.loadAlbums, (state, payload) => ({
    ...state,
    loaded: false,
    list: [],
  })),
  on(AlbumsAction.albumsLoaded, (state, payload) => ({
    ...state,
    list: payload.albums,
    loaded: true,
  })),
  on(AlbumsAction.loadAlbum, (state, payload) => ({
    ...state,
    loaded: false,
    list: [],
  })),
  on(AlbumsAction.albumLoaded, (state, payload) => ({
    ...state,
    list: payload.album,
    loaded: true,
  })),
  on(AlbumsAction.loadAlbumTracks, (state, payload) => ({
    ...state,
    tracksLoaded: false,
    trackList: null,
  })),
  on(AlbumsAction.albumTracksLoaded, (state, payload) => ({
    ...state,
    trackList: payload.tracks,
    tracksLoaded: true,
    selectedId: payload.albumId,
  })),
  on(AlbumsAction.setAlbumTracks, (state, payload) => ({
    ...state,
    selectedId: payload.album.id,
    trackList: payload.album,
    tracksLoaded: true,
    trackPos: payload.trackPos ? payload.trackPos : -1,
  }))
);

export function reducer(state: AlbumsState | undefined, action: Action) {
  return albumsReducer(state, action);
}
