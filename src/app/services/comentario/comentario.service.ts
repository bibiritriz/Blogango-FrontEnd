import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Comentario,
  ComentarioCreateDTO,
  ComentarioUpdateDTO,
} from '../../models/comentario.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly http = inject(HttpClient);

  private readonly url = 'http://localhost:8080/api/comentarios';

  public obterComentarios(postId: string): Observable<Page<Comentario>> {
    return this.http.get<Page<Comentario>>(`${this.url}/${postId}`);
  }

  public obterComentariosAprovadosFalse(
    page: number = 0,
    size: number = 10,
    sort: string = 'autor,desc',
  ): Observable<Page<Comentario>> {
    let params = new HttpParams();

    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', sort);

    return this.http.get<Page<Comentario>>(this.url, { params });
  }

  public criarComentario(comentario: ComentarioCreateDTO): Observable<Comentario> {
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
