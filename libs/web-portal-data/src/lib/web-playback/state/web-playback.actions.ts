import { Action } from '@ngrx/store';

export enum WebPlaybackActionTypes {
  Play = '[WebPlayback] Play',
  PlaySuccess = '[WebPlayback] Play Success',
  PlayError = '[WebPlayback] Play Error',
  SetPlaying = '[WebPlayback] Set Playing',
  SetVol = '[WebPlayback] Set Vol',
  ToggleMute = '[WebPlayback] Toggle Mute',
  SetPlayerInfo = '[WebPlayback] Set Player Info',
  SetTrackWindow = '[WebPlayback] Set Track Window'
}

export class Play implements Action {
  readonly type = WebPlaybackActionTypes.Play;
  constructor(public payload: any) {}
}

export class PlaySuccess implements Action {
  readonly type = WebPlaybackActionTypes.PlaySuccess;
  constructor() {}
}

export class PlayError implements Action {
  readonly type = WebPlaybackActionTypes.PlayError;
  constructor() {}
}

export class SetPlaying implements Action {
  readonly type = WebPlaybackActionTypes.SetPlaying;
  constructor(public payload: any) {}
}

export class SetVol implements Action {
  readonly type = WebPlaybackActionTypes.SetVol;
  constructor(public payload: any) {}
}

export class ToggleMute implements Action {
  readonly type = WebPlaybackActionTypes.ToggleMute;
  constructor() {}
}

export class SetPlayerInfo implements Action {
  readonly type = WebPlaybackActionTypes.SetPlayerInfo;
  constructor(public payload: any) {}
}

export class SetTrackWindow implements Action {
  readonly type = WebPlaybackActionTypes.SetTrackWindow;
  constructor(public payload: any) {}
}

export type WebPlaybackAction =
  | Play
  | PlaySuccess
  | PlayError
  | SetPlaying
  | SetVol
  | ToggleMute
  | SetPlayerInfo
  | SetTrackWindow;

export const fromWebPlaybackActions = {
  Play,
  PlaySuccess,
  PlayError,
  SetPlaying,
  SetVol,
  ToggleMute,
  SetPlayerInfo,
  SetTrackWindow
};
