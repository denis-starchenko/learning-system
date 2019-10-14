import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as GroupActions from '../actions/groups.actions';
import { Router } from '@angular/router';
import { GroupsService } from "../../modules/users/groups/groups.service";

@Injectable()
export class GroupsEffects {
  constructor(private groupsService: GroupsService, private actions$: Actions, private router: Router) {
  }

  createGroup$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupActions.createGroup),
        mergeMap(action =>
          this.groupsService.createGroup({
            name: action.name,
            description: action.description,
            students_count: action.students_count,
            cost: {
              sum: action.cost.sum,
              currencyCode: action.cost.currencyCode
            }
          })
            .pipe(
              map(group => this.getGroups(group)),
              catchError(error => of(GroupActions.createGroupFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
  );

  createGroupComplete$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupActions.createGroupComplete),
        tap(() => {
          this.groupsService.getGroups();
          this.router.navigateByUrl('/groups');
        })
      ),
    {dispatch: false}
  );

  createGroupFailure$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupActions.createGroupFailure),
        tap(payload => {
          alert(payload.error.error);
        })
      ),
    {dispatch: false}
  );

  private getGroups(groups) {
    return GroupActions.createGroupComplete({payload: groups});
  }
}
