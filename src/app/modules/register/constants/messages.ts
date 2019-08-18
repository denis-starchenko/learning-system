import { ValidationMessages } from "../interfaces/validation-messages";

export const messages: ValidationMessages = {
  login: [
    {type: 'required', message: 'Email is required'},
    {type: 'minlength', message: 'Email must be at least 4 characters long'},
    {type: 'email', message: 'Email is not valid'},
  ],
  firstName: [
    {type: 'required', message: 'First Name is required'},
  ],
  lastName: [
    {type: 'required', message: 'Last Name is required'},
  ],
  password: [
    {type: 'required', message: 'Password is required'},
    {type: 'hasCapitalCase', message: 'Password must have a letter in a Capital case'},
    {type: 'hasSmallCase', message: 'Password must have a letter in a Low case'},
    {type: 'hasNumber', message: 'Password must have a Number in range "0-9"'},
    {type: 'hasCharacter', message: 'Password must have a Special character'},
    {type: 'minlength', message: 'Password must be at least 9 characters long'},
    {type: 'maxlength', message: 'Password should not be more than 30 characters'}
  ],
  confirmPassword: [
    {type: 'required', message: 'Confirm password is required'},
    {type: 'noMatches', message: 'Password doesn\'t match'}
  ]
}
