import {ActionReducerMap} from "@ngrx/store";
import * as fromLayout from './reducers/login.reducers';

export interface State {
  layout: fromLayout.State
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer
};
