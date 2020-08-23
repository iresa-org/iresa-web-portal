import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { webPlaybackQuery } from './web-playback.selectors';
import { WebPlaybackPartialState } from './web-playback.reducer';
import * as WebPlaybackAction from './web-playback.actions';

@Injectable()
export class WebPlaybackFacade {
  queue$ = this.store.pipe(select(webPlaybackQuery.getQueue));
  playing$ = this.store.pipe(select(webPlaybackQuery.getPlaying));
  vol$ = this.store.pipe(select(webPlaybackQuery.getVol));
  currTrack$ = this.store.pipe(select(webPlaybackQuery.getCurrTrack));

  constructor(private store: Store<WebPlaybackPartialState>) {}

  play(songURIs) {
    this.store.dispatch(WebPlaybackAction.play({ songURIs }));
  }

  setPlaying(playing) {
    this.store.dispatch(WebPlaybackAction.setPlaying({ playing }));
  }

  toggleMute() {
    this.store.dispatch(WebPlaybackAction.toggleMute());
  }

  setVol(vol) {
    this.store.dispatch(WebPlaybackAction.setVol({ vol }));
  }

  setPlayerInfo(player) {
    this.store.dispatch(WebPlaybackAction.setPlayerInfo({ player }));
  }

  setTrackWindow(trackWindow) {
    this.store.dispatch(WebPlaybackAction.setTrackWindow({ trackWindow }));
  }
}
