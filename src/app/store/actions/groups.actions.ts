import { createAction, props } from '@ngrx/store';
import { Group } from "../../modules/users/interfaces/groups";

export class CreateGroup {
  readonly type = '[Groups Component] createGroup';

  constructor(public group: Group = null) {
  }
}

export const createGroupFailure = createAction(
  '[Groups Component] CreateGroup Failure',
  props<{ error: any }>()
);

export const getGroupslist = createAction(
  '[Groups Component] getGroupslist',
);

export const getGroupslistComplete = createAction(
  '[Groups Component] getGroupslist Complete',
  props<{ payload }>()
);

export const getGroupslistFailure = createAction(
  '[Groups Component] getGroupslist Complete',
  props<{ error: any }>()
)
