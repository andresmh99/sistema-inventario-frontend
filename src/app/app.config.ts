import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { ApiInterceptor } from './common/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './common/interceptors/error-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([ApiInterceptor, ErrorApiInterceptor])),
    AuthGuard
  ],
};
