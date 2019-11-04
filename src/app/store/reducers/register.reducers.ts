import {Action, createReducer, on} from '@ngrx/store';
import * as ActionsComponents from '@actions/register.actions';

export interface State {
  roleName: string;
}

export const initialState: State = {
  roleName: ''
};

const registerReducer = createReducer(
  initialState,
  on(ActionsComponents.registerComplete, (state, action) => ({ ...state, roleName: action.payload.user.roleName }))
);

export function reducer(state: State | undefined, action: Action) {
  return registerReducer(state, action);
}
