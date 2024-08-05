import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

/**
 * Custom pipe for performing validations on an AbstractControl.
 * This pipe is used to display error messages based on the validation errors of the control.
 *
 * @remarks
 * The `validations` pipe takes an AbstractControl as the first argument and additional arguments as needed.
 * It checks if the control has been touched, is valid, and has errors. If any of these conditions are not met, an empty string is returned.
 * If the control has errors, the pipe retrieves the first error and looks up the corresponding error message from the `validations` object.
 * The error message is then formatted with the provided field name and any additional parameters.
 *
 * @example
 * ```html
 * <div>{{ control | validations: 'Field Name' }}</div>
 * ```
 *
 * @public
 */
@Pipe({
  name: 'validations',
  pure: false
})
export class ValidationsPipe implements PipeTransform {

  transform(value: AbstractControl | null, ...args: any[]): string {
    if(!value || !value.touched || value.valid || !value.errors) return "";

    const error = Object.keys(value.errors)[0];

    const message = validations[error];
    const field = args[0] ?? "";
    const params = args.slice(1);

    params[0] = this.getParams(error, value.errors[error]) ?? params[0]

    return message.replace("$0", field)
      .replace("$1", params[0] ?? '')
      .replace("$2", params[1] ?? '');
  }

  getParams(errorName:string, error:ValidationErrors){
    switch(errorName){
      case "minlength":
      case "maxlength":
        return error['requiredLength'];

      case "min":
        return error['min'];

      case "max":
        return error['max'];

      default:
        return "";
    }
  }
}

const validations: { [key:string]: string } =
{
  "required": 'El campo $0 es requerido',
  "minlength": 'El campo $0 debe tener al menos $1 caracter(es)',
  "maxlength": 'El campo $0 debe tener un maximo de $1 caracteres',
  "pattern": 'El campo $0 no es valido $1',
  "min": 'El campo $0 debe ser mayor a $1',
  "max": 'El campo $0 debe ser menor a $1',
  "json": 'Json Invalido',
}

