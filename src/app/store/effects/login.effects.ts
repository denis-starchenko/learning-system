import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as LoginActions from '@actions/login.actions';
import {LoginService} from '../../modules/login/login.service';
import {Router} from '@angular/router';
import * as UserStatusActions from "@actions/user-status.actions";

@Injectable()
export class LoginEffects {
  constructor(private loginService: LoginService, private actions$: Actions, private router: Router) {
  }

  login$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.login),
        mergeMap(action =>
          this.loginService.login({login: action.login, password: action.password})
            .pipe(
              map(user => this.login(user)),
              catchError(error => of(LoginActions.loginFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
  );

  loginComplete$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.loginComplete),
        tap(data => {
          this.loginService.notify(data.payload);
          this.status(data.payload);
          this.router.navigateByUrl('/groups');
        })
      ),
    {dispatch: false}
  );

  loginFailure$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.loginFailure),
        tap(payload => {
          alert(payload.error.error);
        })
      ),
    {dispatch: false}
  );

  private login(user) {
    return LoginActions.loginComplete({payload: user});
  };

  private status(user) {
    return UserStatusActions.statusComplete({payload: user.user.roleName});
  }
}
