import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.parent) {
      const password: string = control.parent.get('password').value;
      const confirmPassword: string = control.value;
      return password !== confirmPassword ? error : null;
    }
  };
}
