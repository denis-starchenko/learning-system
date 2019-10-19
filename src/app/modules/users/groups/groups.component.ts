import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from './groups.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { DialogAddGroupComponent } from '../dialog-add-group/dialog-add-group.component';
import { select, Store } from '@ngrx/store';
import { CreateGroup } from '@actions/groups.actions';
import * as GroupActions from '@actions/groups.actions';
import { Group } from "../interfaces/groups";


@Component({
  selector: 'ls-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<[]>;
  private displayedColumnsHeader: string[] = ['position', 'name', 'students_count', 'updated', 'cost', 'add'];
  private displayedColumnsRow: string[] = ['position', 'name', 'students_count', 'updated', 'cost'];
  private destroy: Subject<any> = new Subject();

  constructor(private grService: GroupsService, public dialog: MatDialog, private store: Store<'groups'>) {
    this.store
      .pipe(
        select('groups'),
        filter(payload => payload.groups && payload.groups.length > 0),
        takeUntil(this.destroy)
      )
      .subscribe(groups => {
        this.createTable(groups);
      });
  }

  ngOnInit() {
    this.store.dispatch(
      GroupActions.getGroupslist()
    )
  }

  createTable(data) {
    if(data['groups'].length > 0) {
      if (data['groups'] instanceof Array) {
        data['groups'].forEach((item, index) => item.position = index + 1);
      }
      this.dataSource = new MatTableDataSource<[]>(data.groups);
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  groupData: Group = {
    name: '',
    description: '',
    students_count: 0,
    cost: {
      sum: 0,
      currencyCode: '',
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddGroupComponent, {
      width: '400px',
      data: this.groupData
    });

    dialogRef.afterClosed().subscribe(result => {
      const groupInfo = result.getRawValue();
      const data: Group = {
        name: groupInfo.name,
        description: groupInfo.description,
        students_count: groupInfo.amount,
        cost: {
          sum: groupInfo.prise,
          currencyCode: groupInfo.currency.toUpperCase(),
        }
      }

      this.store.dispatch(
        new CreateGroup (data)
      );
    });
  }
}

