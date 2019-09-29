import {Action, createReducer, on} from '@ngrx/store';
import * as ActionsComponents from "../actions/login.actions";

export interface State {
  token: string;
}

export const initialState: State = {
  token: ''
};

const loginReducer = createReducer(
  initialState,
  on(ActionsComponents.login, state => ({...state}))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
};
