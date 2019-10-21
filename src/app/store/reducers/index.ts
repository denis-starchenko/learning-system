import { ActionReducerMap } from "@ngrx/store";
import * as fromLayoutLogin from './login.reducers';
import * as fromLayoutGroups from './groups.reducers';

export interface State {
  login: fromLayoutLogin.State,
  groups: fromLayoutGroups.State
}

export const reducers: ActionReducerMap<State> = {
  login: fromLayoutLogin.reducer,
  groups: fromLayoutGroups.reducer
};
