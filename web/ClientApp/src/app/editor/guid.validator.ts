import { Directive, Inject } from "@angular/core";
import { AsyncValidatorFn, AsyncValidator, Validator, NG_VALIDATORS, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { Observable } from "rxjs";
import { ErrorService } from "../error.service";
import { HttpClient } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { IStudent } from "./istudent";

@Directive({
  selector: '[uniqueGuid]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: GuidValidator,
      multi: true
    }
  ]

})
export class GuidValidator implements AsyncValidator {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private errorService: ErrorService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!control.value)
      return null
    else {
      return this.http.get<IStudent>(this.baseUrl + 'api/Students/existsGuid/' + control.value).pipe(
        map(result => 
        {
          console.log(result);
          return (result ? { notUniqueGuid: true } : null)
        }),
        catchError((err) => this.errorService.handleError(err))
      );
    }
  };
}
