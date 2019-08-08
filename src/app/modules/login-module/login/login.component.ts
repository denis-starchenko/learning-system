import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login.service";
import { User } from "../user";

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private userEmail: string;
  private userPassword: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {}

  ngOnInit() {

  }

  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.minLength(4)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  })

  validation_messages = {
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'minlength', message: 'Email must be at least 4 characters long'},
    ],
    password: [
      {type: 'required', message: 'Password is required'},
      {type: 'minlength', message: 'Password must be at least 6 characters long'},
    ]
  }

  getControl(input) {
    return this.loginForm.get(input);
  }

  onSubmit() {
    let user: User = {
      login: this.userEmail,
      password: this.userPassword
    };
    this.loginService.login(user);
  }
}
