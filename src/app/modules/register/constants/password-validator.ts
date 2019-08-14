import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = regex.test(control.value);
    return isValid ? null : error;
  };
}
