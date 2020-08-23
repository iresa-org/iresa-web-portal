import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { WEB_PLAYBACK_FEATURE_KEY } from './web-playback.reducer';
import { SpotifyPlaybackService } from '@iresa/ngx-spotify';
import { map, withLatestFrom } from 'rxjs/operators';
import * as WebPlaybackAction from './web-playback.actions';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';

@Injectable()
export class WebPlaybackEffects {
  play$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebPlaybackAction.play),
      withLatestFrom(this.store$),
      fetch({
        // provides an action
        run: (action, state) => {
          const player = state[WEB_PLAYBACK_FEATURE_KEY].playerInfo;
          return this.spotifyService
            .play(player.authToken, player.device_id, action.songURIs)
            .pipe(map((_) => WebPlaybackAction.playSuccess()));
        },

        onError: (action, error) => {
          // dispatch an undo action to undo the changes in the client state
          return WebPlaybackAction.playError();
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private spotifyService: SpotifyPlaybackService
  ) {}
}
