import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PLAYLISTS_FEATURE_KEY, PlaylistsState } from './playlists.reducer';

// Lookup the 'Playlists' feature state managed by NgRx
const getPlaylistsState = createFeatureSelector<PlaylistsState>(
  PLAYLISTS_FEATURE_KEY
);

const getLoaded = createSelector(
  getPlaylistsState,
  (state: PlaylistsState) => state.loaded
);

const getTracksLoaded = createSelector(
  getPlaylistsState,
  (state: PlaylistsState) => state.tracksLoaded
);

const getError = createSelector(
  getPlaylistsState,
  (state: PlaylistsState) => state.error
);

const getFavPlaylists = createSelector(
  getPlaylistsState,
  getLoaded,
  (state: PlaylistsState, isLoaded) => {
    return isLoaded ? state.list.filter(pl => pl.type === 'favorite') : [];
  }
);

const getCustPlaylists = createSelector(
  getPlaylistsState,
  getLoaded,
  (state: PlaylistsState, isLoaded) => {
    return isLoaded ? state.list.filter(pl => pl.type !== 'favorite') : [];
  }
);

const getPlaylist = createSelector(
  getPlaylistsState,
  (state: PlaylistsState, props) =>
    state.list.find(item => item.id === props.id)
);

export const playlistsQuery = {
  getLoaded,
  getTracksLoaded,
  getError,
  getFavPlaylists,
  getCustPlaylists,
  getPlaylist
};
