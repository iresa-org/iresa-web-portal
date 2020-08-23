import { props, createAction } from '@ngrx/store';

export const loadPlaylists = createAction('[Playlists] Load Playlists');

export const playlistsLoaded = createAction(
  '[Playlists] Playlists Loaded',
  props<{ playlists: any[] }>()
);

export const playlistsLoadError = createAction(
  '[Playlists] Playlists Load Error',
  props<any>()
);

export const createPlaylist = createAction(
  '[Playlists] Create Playlist',
  props<{ playlist }>()
);

export const createPlaylistSuccess = createAction(
  '[Playlists] Create Playlist Success',
  props<any>()
);

export const createPlaylistError = createAction(
  '[Playlists] Create Playlist Error',
  props<any>()
);

export const addToPlaylist = createAction(
  '[Playlists] Add To Playlist',
  props<any>()
);

export const getPlaylistTracks = createAction(
  '[Playlists] Get Playlist Tracks',
  props<{ id: string }>()
);

export const getPlaylistTracksSuccess = createAction(
  '[Playlists] Get Playlist Tracks Success',
  props<{ playlist; tracks }>()
);

export const getPlaylistTracksError = createAction(
  '[Playlists] Get Playlist Tracks Error'
);

export const deletePlaylistTrack = createAction(
  '[Playlists] Delete Playlist Track',
  props<any>()
);
