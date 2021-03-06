import { ValidationMessages } from "../interfaces/validation-messages";

export const messages: ValidationMessages = {
  login: [
    {type: 'required', message: 'Email is required'},
    {type: 'minlength', message: 'Email must be at least 4 characters long'},
  ],
  password: [
    {type: 'required', message: 'Password is required'},
    {type: 'minlength', message: 'Password must be at least 6 characters long'},
  ]
}
