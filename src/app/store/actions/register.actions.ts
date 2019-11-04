import {createAction, props} from '@ngrx/store';

export const register = createAction(
  '[Register Component] Register',
  props<{
    login: string,
    password: string;
    firstName: string;
    lastName: string;
  }>()
);

export const registerComplete = createAction(
  '[Register Component] Register Complete',
  props<{ payload }>()
);

export const registerFailure = createAction(
  '[Register Component] Register Failure',
  props<{ error: any }>()
);
