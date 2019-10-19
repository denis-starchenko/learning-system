import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsComponents from '@actions/groups.actions';

export interface State {
  groups: Array<object>;
}

export const initialState: State = {
  groups: []
};

const groupReducer = createReducer(
  initialState,
  on(ActionsComponents.getGroupslistComplete, (state, action) => ({ ...state, groups: action.payload }))
);

export function reducer(state: State | undefined, action: Action) {
  return groupReducer(state, action);
}
