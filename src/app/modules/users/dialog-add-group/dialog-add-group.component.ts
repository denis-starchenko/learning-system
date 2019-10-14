import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData } from "../interfaces/dialogData";

@Component({
    selector: 'ls-dialog-add-group',
    templateUrl: './dialog-add-group.component.html',
    styleUrls: ['./dialog-add-group.component.scss']
  })
  export class DialogAddGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
