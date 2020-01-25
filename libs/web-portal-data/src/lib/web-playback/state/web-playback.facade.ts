import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { webPlaybackQuery } from './web-playback.selectors';
import { WebPlaybackPartialState } from './web-playback.reducer';
import { fromWebPlaybackActions } from './web-playback.actions';

@Injectable()
export class WebPlaybackFacade {
  queue$ = this.store.pipe(select(webPlaybackQuery.getQueue));
  playing$ = this.store.pipe(select(webPlaybackQuery.getPlaying));
  vol$ = this.store.pipe(select(webPlaybackQuery.getVol));
  currTrack$ = this.store.pipe(select(webPlaybackQuery.getCurrTrack));

  constructor(private store: Store<WebPlaybackPartialState>) {}

  play(data) {
    this.store.dispatch(new fromWebPlaybackActions.Play(data));
  }

  setPlaying(val) {
    this.store.dispatch(new fromWebPlaybackActions.SetPlaying(val));
  }

  toggleMute() {
    this.store.dispatch(new fromWebPlaybackActions.ToggleMute());
  }

  setVol(data) {
    this.store.dispatch(new fromWebPlaybackActions.SetVol(data));
  }

  setPlayerInfo(data) {
    this.store.dispatch(new fromWebPlaybackActions.SetPlayerInfo(data));
  }

  setTrackWindow(data) {
    this.store.dispatch(new fromWebPlaybackActions.SetTrackWindow(data));
  }
}
