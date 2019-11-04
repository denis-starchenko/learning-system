import { ActionReducerMap } from "@ngrx/store";
import * as fromLayoutLogin from './login.reducers';
import * as fromLayoutRegister from './register.reducers';
import * as fromLayoutGroups from './groups.reducers';
import * as fromLayoutGuard from './user-status.reducers';

export interface State {
  login: fromLayoutLogin.State,
  register: fromLayoutRegister.State,
  groups: fromLayoutGroups.State,
  roleName: fromLayoutGuard.State
}

export const reducers: ActionReducerMap<State> = {
  login: fromLayoutLogin.reducer,
  register: fromLayoutRegister.reducer,
  groups: fromLayoutGroups.reducer,
  roleName: fromLayoutGuard.reducer
};
