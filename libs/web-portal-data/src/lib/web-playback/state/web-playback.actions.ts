import { createAction, props } from '@ngrx/store';

export const play = createAction('[WebPlayback] Play', props<{ songURIs }>());

export const playSuccess = createAction('[WebPlayback] Play Success');

export const playError = createAction('[WebPlayback] Play Error');

export const setPlaying = createAction(
  '[WebPlayback] Set Playing',
  props<{ playing }>()
);

export const setVol = createAction('[WebPlayback] Set Vol', props<{ vol }>());

export const toggleMute = createAction('[WebPlayback] Toggle Mute');

export const setPlayerInfo = createAction(
  '[WebPlayback] Set Player Info',
  props<{ player }>()
);

export const setTrackWindow = createAction(
  '[WebPlayback] Set Track Window',
  props<{ trackWindow }>()
);
