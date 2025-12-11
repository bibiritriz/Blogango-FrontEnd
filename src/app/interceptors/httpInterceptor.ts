import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { inject } from '@angular/core';
import { SpringErrorResponse } from '../types/api-error';

export const httpInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      const toast = inject(HotToastService);

      let mensagem = 'Ocorreu um erro inesperado';

      if (httpError.error && typeof httpError.error === 'object') {
        const apiError = httpError.error as SpringErrorResponse;

        if (apiError.message) {
          mensagem = apiError.message;
        }
      }

      if (httpError.status === 0) {
        mensagem = 'Sem conexão com o servidor';
      }

      toast.error(mensagem);

      return throwError(() => httpError);
    }),
  );
