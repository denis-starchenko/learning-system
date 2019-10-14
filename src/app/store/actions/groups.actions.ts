import {createAction, props} from '@ngrx/store';

export const createGroup = createAction(
  '[Groups Component] createGroup',
  props<{
    name: string,
    description: string;
    students_count: number;
    cost: {
      sum: number,
      currencyCode: string
    };
  }>()
);

export const createGroupComplete = createAction(
  '[Groups Component] CreateGroup Complete',
  props<{ payload }>()
);

export const createGroupFailure = createAction(
  '[Groups Component] CreateGroup Failure',
  props<{ error: any }>()
);
