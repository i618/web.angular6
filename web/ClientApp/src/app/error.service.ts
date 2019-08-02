import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if (!error.ok) {
      this.router.navigate(['errorpage']);
      return throwError(error.error);
    }
  }
}
