import {createAction, props} from '@ngrx/store';

interface Group {
  name: string,
  description: string;
  students_count: number;
  cost: {
    sum: number,
    currencyCode: string
  };
}

export class CreateGroup {
  readonly type = '[Groups Component] createGroup';

  constructor(public group: Group = null) {}
}

export const createGroupComplete = createAction(
  '[Groups Component] CreateGroup Complete',
  props<{ payload }>()
);

export const createGroupFailure = createAction(
  '[Groups Component] CreateGroup Failure',
  props<{ error: any }>()
);
