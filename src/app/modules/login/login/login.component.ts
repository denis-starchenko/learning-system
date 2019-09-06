import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { messages } from '../constants/messages';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

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
  private subscription: Subject<any> = new Subject();
  private loginService: LoginService;
  private formBuilder: FormBuilder;
  private router: Router;

  constructor(ls: LoginService, fb: FormBuilder, router: Router) {
    this.loginService = ls;
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
    this.loginService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntil(this.subscription))
      .subscribe(user => {
        this.loginService.notify(user);
        this.router.navigateByUrl('/groups');
      });
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
