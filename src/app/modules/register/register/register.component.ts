import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from "../constants/messages";
import { passwordValidator } from "../constants/password-validator";
import { passwordMatchValidator } from "../constants/password-match-validator";
import { RepeatPasswordEStateMatcher } from "../constants/repeat-password-matcher";
import { RegisterService } from "../register.service";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ls-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subscription: Subject<any> = new Subject();
  private registerForm: FormGroup;
  private validMessages = messages;
  private passwordsMatcher = new RepeatPasswordEStateMatcher;

  constructor(private formBuilder: FormBuilder, private regService: RegisterService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.email
      ]],
      firstName: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]],
      password: ['', [
        Validators.required,
        passwordValidator(/[A-Z]/, {hasCapitalCase: true}),
        passwordValidator(/[a-z]/, {hasSmallCase: true}),
        passwordValidator( /(?=.*[~!@#$%^&*_\-+=`|\\(){}/[\]:;"'<>,.?])/, {hasCharacter: true}),
        passwordValidator(/\d/, {hasNumber: true}),
        Validators.minLength(9),
        Validators.maxLength(30)
      ]],
      confirmPassword: ['', [
        Validators.required,
        passwordMatchValidator({noMatches: true})
      ]]
    })
  }

  getControl(input: string): AbstractControl {
    return this.registerForm.get(input);
  }

  onSubmit(): void {
    this.regService
      .register(this.registerForm.getRawValue())
      .pipe(takeUntil(this.subscription))
      .subscribe(user => this.regService.notify(user));
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
