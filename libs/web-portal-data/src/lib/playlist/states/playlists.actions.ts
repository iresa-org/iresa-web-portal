import { Action } from '@ngrx/store';

export enum PlaylistsActionTypes {
  LoadPlaylists = '[Playlists] Load Playlists',
  PlaylistsLoaded = '[Playlists] Playlists Loaded',
  PlaylistsLoadError = '[Playlists] Playlists Load Error',
  CreatePlaylist = '[Albums] Create Playlist',
  CreatePlaylistSuccess = '[Albums] Create Playlist Success',
  CreatePlaylistError = '[Albums] Create Playlist Error',
  AddToPlaylist = '[Albums] Add To Playlist',
  GetPlaylistTracks = '[Albums] Get Playlist Tracks',
  GetPlaylistTracksSuccess = '[Albums] Get Playlist Tracks Success',
  GetPlaylistTracksError = '[Albums] Get Playlist Tracks Error',
  DeletePlaylistTrack = '[Albums] Delete Playlist Track'
}

export class LoadPlaylists implements Action {
  readonly type = PlaylistsActionTypes.LoadPlaylists;
}

export class PlaylistsLoadError implements Action {
  readonly type = PlaylistsActionTypes.PlaylistsLoadError;
  constructor(public payload: any) {}
}

export class PlaylistsLoaded implements Action {
  readonly type = PlaylistsActionTypes.PlaylistsLoaded;
  constructor(public payload: any[]) {}
}

export class CreatePlaylist implements Action {
  readonly type = PlaylistsActionTypes.CreatePlaylist;
  constructor(public payload: any) {}
}

export class CreatePlaylistSuccess implements Action {
  readonly type = PlaylistsActionTypes.CreatePlaylistSuccess;
  constructor(public payload: any) {}
}

export class CreatePlaylistError implements Action {
  readonly type = PlaylistsActionTypes.CreatePlaylistError;
  constructor(public payload: any) {}
}

export class AddToPlaylist implements Action {
  readonly type = PlaylistsActionTypes.AddToPlaylist;
  constructor(public payload: any) {}
}

export class GetPlaylistTracks implements Action {
  readonly type = PlaylistsActionTypes.GetPlaylistTracks;
  constructor(public payload: any) {}
}

export class GetPlaylistTracksSuccess implements Action {
  readonly type = PlaylistsActionTypes.GetPlaylistTracksSuccess;
  constructor(public payload: any) {}
}

export class GetPlaylistTracksError implements Action {
  readonly type = PlaylistsActionTypes.GetPlaylistTracksError;
  constructor() {}
}

export class DeletePlaylistTrack implements Action {
  readonly type = PlaylistsActionTypes.DeletePlaylistTrack;
  constructor(public payload: any) {}
}

export type PlaylistsAction =
  | LoadPlaylists
  | PlaylistsLoaded
  | PlaylistsLoadError
  | CreatePlaylist
  | CreatePlaylistSuccess
  | CreatePlaylistError
  | AddToPlaylist
  | GetPlaylistTracks
  | GetPlaylistTracksSuccess
  | GetPlaylistTracksError
  | DeletePlaylistTrack;

export const fromPlaylistsActions = {
  LoadPlaylists,
  PlaylistsLoaded,
  PlaylistsLoadError,
  CreatePlaylist,
  CreatePlaylistSuccess,
  CreatePlaylistError,
  AddToPlaylist,
  GetPlaylistTracks,
  GetPlaylistTracksSuccess,
  GetPlaylistTracksError,
  DeletePlaylistTrack
};
