import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { messages } from "../constants/messages";
import { passwordValidator } from "../constants/password-validator";
import { passwordMatchValidator } from "../constants/password-match-validator";
import { RepeatPasswordEStateMatcher } from "../constants/repeat-password-matcher";
import { Store } from "@ngrx/store";
import { register } from "@actions/register.actions";



@Component({
  selector: 'ls-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private validMessages = messages;
  private passwordsMatcher = new RepeatPasswordEStateMatcher;

  constructor(private store: Store<'register'>, private formBuilder: FormBuilder) { }

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
    this.store
      .dispatch(
        register(this.registerForm.getRawValue()),
      )
  }
}
