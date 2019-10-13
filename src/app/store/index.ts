import {ActionReducerMap} from "@ngrx/store";
import * as fromLayout from './reducers/login.reducers';

export interface State {
  login: fromLayout.State
}

export const reducers: ActionReducerMap<State> = {
  login: fromLayout.reducer
};
