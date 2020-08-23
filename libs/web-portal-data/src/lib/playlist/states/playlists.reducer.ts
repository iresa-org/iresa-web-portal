import * as PlaylistsAction from './playlists.actions';
import { Action, on, createReducer } from '@ngrx/store';

export const PLAYLISTS_FEATURE_KEY = 'playlists';

/**
 * Interface for the 'Playlists' data used in
 *  - PlaylistsState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

export interface PlaylistsState {
  list: any[]; // list of Playlists; analogous to a sql normalized table
  selectedId?: string | number; // which Playlists record has been selected
  prevIdx: number;
  loaded: boolean; // has the Playlists list been loaded
  error?: any; // last none error (if any),
  tracksLoaded: boolean;
}

export interface PlaylistsPartialState {
  readonly [PLAYLISTS_FEATURE_KEY]: PlaylistsState;
}

export const initialState: PlaylistsState = {
  list: [],
  prevIdx: -1,
  loaded: false,
  tracksLoaded: false,
};

const playlistsReducer = createReducer(
  initialState,
  on(PlaylistsAction.playlistsLoaded, (state, payload) => ({
    ...state,
    list: payload.playlists,
    loaded: true,
  })),
  on(PlaylistsAction.getPlaylistTracksSuccess, (state, payload) => ({
    ...state,
    list: state.list.map((item) =>
      item.id === payload.playlist.id
        ? { ...item, tracks: payload.tracks }
        : item
    ),
    tracksLoaded: true,
  })),
  on(PlaylistsAction.deletePlaylistTrack, (state, payload) => ({
    ...state,
    list: state.list.map((item) =>
      item.id === payload.playlistId
        ? {
            ...item,
            tracks: item.tracks.filter((_, i) => i !== payload.position),
          }
        : item
    ),
  })),
  on(PlaylistsAction.addToPlaylist, (state, payload) => ({
    ...state,
    list: state.list.map((item) =>
      item.id === payload.playlistId
        ? { ...item, tracks: [...item.tracks, payload.track] }
        : item
    ),
  })),
  on(PlaylistsAction.createPlaylistSuccess, (state, payload) => ({
    ...state,
    list: [...state.list, payload.playlist],
  }))
);

export function reducer(state: PlaylistsState | undefined, action: Action) {
  return playlistsReducer(state, action);
}
