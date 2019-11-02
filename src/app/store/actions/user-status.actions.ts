import { createAction, props } from '@ngrx/store';


export const status = createAction(
  '[Ls Component] Status'
);

export const statusComplete = createAction(
  '[Ls Component] Status Complete',
  props<{ payload }>()
);

export const statusFailure = createAction(
  '[Ls Component] Status Failure',
  props<{ error: any }>()
);
