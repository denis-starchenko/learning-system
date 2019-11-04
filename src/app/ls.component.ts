import { Component } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as UserStatusActions from "@actions/user-status.actions";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './ls.component.html',
  styleUrls: ['./ls.component.scss']
})


export class LsComponent implements CanActivate {
  constructor(private store: Store<'roleName'>, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('roleName'),
      map(user => {
        if (user && user.roleName === 'GROUPS_TEACHER_ROLE') {
          return true
        } else if (user && user.roleName === 'GROUPS_STUDENT_ROLE') {
          this.router.navigateByUrl('/**');
          return false;
        } else {
          this.store.dispatch(
            UserStatusActions.status()
          );
        }
      }),
      take(1)
    );
  }
}
