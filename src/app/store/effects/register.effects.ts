import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as RegisterActions from '@actions/register.actions';
import {Router} from '@angular/router';
import * as UserStatusActions from "@actions/user-status.actions";
import {RegisterService} from "../../modules/register/register.service";

@Injectable()
export class RegisterEffects {
  constructor(private registerService: RegisterService, private actions$: Actions, private router: Router) {
  }

  register$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(RegisterActions.register),
        mergeMap(action =>
          this.registerService.register({
            login: action.login,
            password: action.password,
            firstName: action.firstName,
            lastName: action.lastName
          })
            .pipe(
              map(user => this.register(user)),
              catchError(error => of(RegisterActions.registerFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
  );

  registerComplete$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(RegisterActions.registerComplete),
        tap(data => {
          this.registerService.notify(data.payload);
          this.status(data.payload);
          this.router.navigateByUrl('/groups');
        })
      ),
    {dispatch: false}
  );

  registerFailure$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(RegisterActions.registerFailure),
        tap(payload => {
          alert(payload.error.error);
        })
      ),
    {dispatch: false}
  );

  private register(user) {
    return RegisterActions.registerComplete({payload: user});
  };

  private status(user) {
    return UserStatusActions.statusComplete({payload: user.user.roleName});
  }
}
