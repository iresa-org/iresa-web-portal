import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import {
  WebPlaybackPartialState,
  WEB_PLAYBACK_FEATURE_KEY
} from './web-playback.reducer';
import {
  WebPlaybackActionTypes,
  fromWebPlaybackActions,
  Play
} from './web-playback.actions';
import { SpotifyPlaybackService } from '@iresa/ngx-spotify';
import { map } from 'rxjs/operators';

@Injectable()
export class WebPlaybackEffects {
  @Effect() play$ = this.dataPersistence.fetch(WebPlaybackActionTypes.Play, {
    run: (action: Play, state: WebPlaybackPartialState) => {
      const player = state[WEB_PLAYBACK_FEATURE_KEY].playerInfo;
      return this.spotifyService
        .play(player.authToken, player.device_id, action.payload)
        .pipe(map(_ => new fromWebPlaybackActions.PlaySuccess()));
    },

    onError: (action: Play, error) => {
      return new fromWebPlaybackActions.PlayError();
    }
  });

  constructor(
    private actions$: Actions,
    private spotifyService: SpotifyPlaybackService,
    private dataPersistence: DataPersistence<WebPlaybackPartialState>
  ) {}
}
