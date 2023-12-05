import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AUTH_URL } from '../../services/urls.api';
import { inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';
import { TokenInterceptorService } from '../../services/token-interceptor.service';

export var activeRequest: number = 0;

export const ApiInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const ngxService = inject(NgxUiLoaderService);
  const TokenInterceptor = inject(TokenInterceptorService);

  if (req.url === AUTH_URL) {
    next(req);
  }
  if (activeRequest === 0) {
    ngxService.start();
  }

  const requestClone = TokenInterceptor.addTokenheader(req)

  return next(requestClone).pipe(finalize(() => ngxService.stop()));
};
