import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Group } from "../interfaces/groups";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'ls-dialog-add-group',
    templateUrl: './dialog-add-group.component.html',
    styleUrls: ['./dialog-add-group.component.scss']
  })
  export class DialogAddGroupComponent implements OnInit {
  private createGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.createGroup = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      amount: ['', [
        Validators.required
      ]],
      prise: ['', [
        Validators.required
      ]],
      currency: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
    })
  }

  cancel(): void {
    this.dialogRef.close();
    this.resetForm();
  }

  resetForm(): void {
    this.createGroup.reset();
  }
}
