import { createAction, props } from '@ngrx/store';

export const loadAlbums = createAction(
  '[Albums] Load Albums',
  props<{ artistId; useSample? }>()
);

export const albumsLoaded = createAction(
  '[Albums] Albums Loaded',
  props<{ albums }>()
);

export const albumsLoadError = createAction(
  '[Albums] Albums Load Error',
  props<any>()
);

export const loadAlbum = createAction(
  '[Albums] Load Album',
  props<{ albumId; useSample? }>()
);

export const albumLoaded = createAction(
  '[Albums] Album Loaded',
  props<{ album }>()
);

export const albumLoadError = createAction(
  '[Albums] Album Load Error',
  props<any>()
);

export const loadAlbumTracks = createAction(
  '[Albums] Load Album Tracks',
  props<{ album }>()
);

export const albumTracksLoaded = createAction(
  '[Albums] Album Tracks Loaded',
  props<any>()
);

export const albumTracksLoadError = createAction(
  '[Albums] Album Tracks Load Error',
  props<any>()
);

export const setAlbumTracks = createAction(
  '[Albums] Set Album Tracks',
  props<any>()
);

export const loadPlaylistTracks = createAction(
  '[Albums] Load Playlist Tracks',
  props<any>()
);

export const playlistLoaded = createAction(
  '[Albums] Playlist Loaded',
  props<any>()
);

export const playlistLoadError = createAction(
  '[Albums] Playlist Load Error',
  props<any>()
);
