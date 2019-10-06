import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from '../constants/messages';
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { login } from "../../../store/actions/login.actions";
import { Subject } from "rxjs";

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private userEmail: string;
  private userPassword: string;
  private validMessages = messages;
  private loginForm: FormGroup;
  private destroy: Subject<any> = new Subject();
  private formBuilder: FormBuilder;
  private router: Router;
  private store;

  constructor(store: Store<any>, fb: FormBuilder, router: Router) {
    this.store = store;
    this.formBuilder = fb;
    this.router = router;
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  getControl(input: string): AbstractControl {
    return this.loginForm.get(input);
  }

  onSubmit(): void {
    this.store.dispatch(
      login(this.loginForm.getRawValue()),
      takeUntil(this.destroy)
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
