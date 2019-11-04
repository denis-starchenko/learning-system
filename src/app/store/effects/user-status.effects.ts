import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as UserStatusActions from '@actions/user-status.actions';
import {Router} from '@angular/router';
import {UserStatusService} from "../../services/userStatus.service";

@Injectable()
export class UserStatusEffects {
  constructor(private userStatusService: UserStatusService, private actions$: Actions, private router: Router) {
  }

  status$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(UserStatusActions.status),
        mergeMap(action =>
          this.userStatusService.getUserStatus()
            .pipe(
              map(user => this.status(user)),
              catchError(error => of(UserStatusActions.statusFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
  );

  statusComplete$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(UserStatusActions.statusComplete),
        tap(data => {
          this.router.navigateByUrl('/groups');
        })
      ),
    {dispatch: false}
  );

  statusFailure$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(UserStatusActions.statusFailure),
        tap(payload => {
          alert(payload.error.error);
        })
      ),
    {dispatch: false}
  );

  private status(user) {
    return UserStatusActions.statusComplete({payload: user.user.roleName});
  }
}
