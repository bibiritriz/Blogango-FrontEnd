import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SpringErrorResponse } from '../types/api-error';

export const httpInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
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

      console.error(`[ERRO API]: ${mensagem}`);
      // TODO: Adicionar toast

      return throwError(() => httpError);
    }),
  );
