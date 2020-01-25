import {
  WebPlaybackAction,
  WebPlaybackActionTypes
} from './web-playback.actions';

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
  playerInfo: null
};

export function reducer(
  state: WebPlaybackState = initialState,
  action: WebPlaybackAction
): WebPlaybackState {
  switch (action.type) {
    case WebPlaybackActionTypes.SetPlaying: {
      state = {
        ...state,
        playing: action.payload
      };
      break;
    }
    case WebPlaybackActionTypes.SetVol: {
      state = {
        ...state,
        vol: action.payload
      };
      break;
    }
    case WebPlaybackActionTypes.ToggleMute: {
      state = {
        ...state,
        vol: state.muted ? state.lastVol : 0,
        lastVol: !state.muted ? state.vol : state.lastVol,
        muted: !state.muted
      };
      break;
    }
    case WebPlaybackActionTypes.SetPlayerInfo: {
      state = {
        ...state,
        playerInfo: action.payload
      };
      break;
    }
    case WebPlaybackActionTypes.SetTrackWindow: {
      state = {
        ...state,
        track_window: action.payload
      };
      break;
    }
  }
  return state;
}
