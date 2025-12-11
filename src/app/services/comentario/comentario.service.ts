import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario, ComentarioUpdateDTO } from '../../models/comentario.model';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly http = inject(HttpClient);

  private readonly url = 'localhost:8080/api/comentarios';

  public obterComentario(comentarioId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.url}/${comentarioId}`);
  }

  public criarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.url, comentario);
  }

  public deletarComentario(comentarioId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${comentarioId}`);
  }

  public atualizarComentario(
    comentarioId: string,
    comentario: ComentarioUpdateDTO,
  ): Observable<void> {
    return this.http.put<void>(`${this.url}/${comentarioId}`, comentario);
  }

  public aprovarComentario(comentarioId: string): Observable<void> {
    return this.http.patch<void>(`${this.url}/${comentarioId}/aprovar`, {});
  }
}
