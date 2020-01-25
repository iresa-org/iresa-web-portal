import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WEB_PLAYBACK_FEATURE_KEY,
  WebPlaybackState
} from './web-playback.reducer';

const getWebPlaybackState = createFeatureSelector<WebPlaybackState>(
  WEB_PLAYBACK_FEATURE_KEY
);

const getQueue = createSelector(
  getWebPlaybackState,
  (state: WebPlaybackState) => {
    if (!state.track_window) {
      return [];
    }
    const curr = { ...state.track_window.current_track, curr: true };
    return [
      ...state.track_window.previous_tracks,
      curr,
      ...state.track_window.next_tracks
    ];
  }
);

const getPlaying = createSelector(
  getWebPlaybackState,
  (state: WebPlaybackState) => state.playing
);

const getVol = createSelector(
  getWebPlaybackState,
  (state: WebPlaybackState) => state.vol
);

const getCurrTrack = createSelector(
  getWebPlaybackState,
  (state: WebPlaybackState) =>
    state.track_window ? state.track_window.current_track : {}
);

export const webPlaybackQuery = {
  getQueue,
  getPlaying,
  getVol,
  getCurrTrack
};
