import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, throwError } from 'rxjs';

export const ErrorApiInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const ngxService = inject(NgxUiLoaderService);
  const router = inject(Router);

  return next(req).pipe(
    //finalize(() => ngxService.stop()),
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        router.navigate(['/']);
        ngxService.stop();
      }
      return throwError(() => error);
    })
  );
};
