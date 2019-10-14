import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from "./groups.service";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAddGroupComponent } from "../dialog-add-group/dialog-add-group.component";
import { DialogData } from "../interfaces/dialogData";
import { Store } from "@ngrx/store";
import { createGroup } from "../../../store/actions/groups.actions";

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

  constructor(private grService: GroupsService, public dialog: MatDialog, private store: Store<any>) {
  }

  ngOnInit() {
    this.getGroupsList();
  }

  getGroupsList() {
    this.grService
      .getGroups()
      .pipe(takeUntil(this.destroy))
      .subscribe(groups => this.createTable(groups));
  }

  createTable(groups) {
    if (groups instanceof Array) {
      groups.forEach((item, index) => item.position = index + 1);
    }
    this.dataSource = new MatTableDataSource<[]>(groups);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  groupData: DialogData = {
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
      const data = {
        name: result.name,
        description: result.description,
        students_count: Number(result.students_count),
        cost: {
          sum: Number(result.cost.sum),
          currencyCode: result.cost.currencyCode,
        }
      }

      this.store.dispatch(
        createGroup(data)
      );
    });
  }
}

