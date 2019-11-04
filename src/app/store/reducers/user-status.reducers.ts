import { Action, createReducer, on } from '@ngrx/store';
import * as LoginComponents from '@actions/login.actions';
import * as UserStatusComponents from '@actions/user-status.actions';
import * as RegisterComponents from "@actions/register.actions";

export interface State {
  roleName: String;
}

export const initialState: State = {
  roleName: ''
};

const userStatusReducer = createReducer(
  initialState,
  on(LoginComponents.loginComplete, (state, action) => ({ ...state, roleName: action.payload.user.roleName })),
  on(RegisterComponents.registerComplete, (state, action) => ({ ...state, roleName: action.payload.user.roleName })),
  on(UserStatusComponents.statusComplete, (state, action) => ({ ...state, roleName: action.payload }))
);

export function reducer(state: State | undefined, action: Action) {
  return userStatusReducer(state, action);
}
