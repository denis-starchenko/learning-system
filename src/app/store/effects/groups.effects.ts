import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as GroupActions from '@actions/groups.actions';
import { GroupsService } from "../../modules/users/groups/groups.service";
import { CreateGroup } from '@actions/groups.actions';

@Injectable()
export class GroupsEffects {
  constructor(private groupsService: GroupsService, private actions$: Actions) {
  }

  createGroup$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(new CreateGroup().type),
        mergeMap((action: any) =>
          this.groupsService.createGroup(action.group)
            .pipe(
              map(() => GroupActions.getGroupslist()),
              catchError(error => of(GroupActions.createGroupFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
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

  getGroupslist$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupActions.getGroupslist),
        mergeMap((action: any) =>
          this.groupsService.getGroups()
            .pipe(
              map(groups => this.getGroups(groups)),
              catchError(error => of(GroupActions.getGroupslistFailure({error})))
            )
        )
      ),
    {resubscribeOnError: false}
  );

  getGroupslistFailure$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
        ofType(GroupActions.getGroupslistFailure),
        tap(payload => {
          alert(payload.error.error);
        })
      ),
    {dispatch: false}
  );

  private getGroups(groups) {
    return GroupActions.getGroupslistComplete({payload: groups});
  };
}
