import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from "./groups.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'ls-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private dataSource: MatTableDataSource<[]>;
  private displayedColumns: string[] = ['position', 'name', 'studentsCount'];
  private subscription: Subject<any> = new Subject();

  constructor(private grService: GroupsService) {
  }

  ngOnInit() {
    this.grService
      .getGroups()
      .pipe(takeUntil(this.subscription))
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
    this.subscription.next();
    this.subscription.complete();
  }
}

