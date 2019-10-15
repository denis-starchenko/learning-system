import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as GroupActions from '../actions/groups.actions';
import { Router } from '@angular/router';
import { GroupsService } from "../../modules/users/groups/groups.service";
import { CreateGroup } from '../actions/groups.actions';

@Injectable()
export class GroupsEffects {
  constructor(private groupsService: GroupsService, private actions$: Actions, private router: Router) {
  }

  createGroup$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(new CreateGroup().type),
        mergeMap((action: any) =>
          this.groupsService.createGroup(action.group)
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
