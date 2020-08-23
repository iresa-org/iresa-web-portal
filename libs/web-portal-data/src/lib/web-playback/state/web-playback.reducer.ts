import * as WebPlaybackAction from './web-playback.actions';
import { on, createReducer, Action } from '@ngrx/store';

export const WEB_PLAYBACK_FEATURE_KEY = 'webPlayback';

export interface WebPlaybackState {
  playing: boolean;
  vol: number;
  lastVol: number;
  muted: boolean;
  track_window: {
    current_track: any;
    previous_tracks: any[];
    next_tracks: any[];
  };
  playerInfo: {
    authToken: string;
    device_id: string;
  };
}

export interface WebPlaybackPartialState {
  readonly [WEB_PLAYBACK_FEATURE_KEY]: WebPlaybackState;
}

export const initialState: WebPlaybackState = {
  playing: false,
  vol: 1,
  lastVol: 1,
  muted: false,
  track_window: null,
  playerInfo: null,
};

const webPlaybackReducer = createReducer(
  initialState,
  on(WebPlaybackAction.setPlaying, (state, payload) => ({
    ...state,
    playing: payload.playing,
  })),
  on(WebPlaybackAction.setVol, (state, payload) => ({
    ...state,
    vol: payload.vol,
  })),
  on(WebPlaybackAction.toggleMute, (state, payload) => ({
    ...state,
    vol: state.muted ? state.lastVol : 0,
    lastVol: !state.muted ? state.vol : state.lastVol,
    muted: !state.muted,
  })),
  on(WebPlaybackAction.setPlayerInfo, (state, payload) => ({
    ...state,
    playerInfo: payload.player,
  })),
  on(WebPlaybackAction.setTrackWindow, (state, payload) => ({
    ...state,
    track_window: payload.trackWindow,
  }))
);

export function reducer(state: WebPlaybackState | undefined, action: Action) {
  return webPlaybackReducer(state, action);
}
