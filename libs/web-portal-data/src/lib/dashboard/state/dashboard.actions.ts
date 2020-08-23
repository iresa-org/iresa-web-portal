import { createAction, props } from '@ngrx/store';

export const search = createAction('[Dashboard] Search', props<{ search }>());

export const searchSuccess = createAction(
  '[Dashboard] Search Success',
  props<{ results }>()
);

export const searchError = createAction('[Dashboard] Search Error');

export const setSelectedMenuItems = createAction(
  '[Dashboard] Set Selected Menu Items',
  props<{ menu }>()
);

export const setLoading = createAction(
  '[Dashboard] Set Loading',
  props<{ loading }>()
);

export const setUseSample = createAction(
  '[Dashboard] Set Use Sample',
  props<{ useSample }>()
);
