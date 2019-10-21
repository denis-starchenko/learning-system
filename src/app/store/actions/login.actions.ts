import {createAction, props} from '@ngrx/store';

export const login = createAction(
  '[Login Component] Login',
  props<{ login: string, password: string; }>()
);

export const loginComplete = createAction(
  '[Login Component] Login Complete',
  props<{ payload }>()
);

export const loginFailure = createAction(
  '[Login Component] Login Failure',
  props<{ error: any }>()
);
