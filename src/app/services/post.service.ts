import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../models/page.model';
import { Post, PostCreateDTO, PostUpdateDTO } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export default class PostService {
  private readonly http = inject(HttpClient);

  private readonly url = 'localhost:8080/api/posts';

  public listar(
    page: number = 0,
    size: number = 10,
    sort: string = 'dataCriacao,desc',
  ): Observable<Page<Post>> {
    let params = new HttpParams();

    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', sort);

    return this.http.get<Page<Post>>(this.url, { params });
  }

  public obterPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  public listarPorCategoria(
    id: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'dataCriacao,desc',
  ): Observable<Page<Post>> {
    let params = new HttpParams();

    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', sort);

    return this.http.get<Page<Post>>(`${this.url}/categoria/${id}`, { params });
  }

  public buscarPorTitulo(
    titulo: string,
    page: number = 0,
    size: number = 10,
    sort: string = 'dataCriacao,desc',
  ): Observable<Page<Post>> {
    let params = new HttpParams();

    params = params.append('titulo', titulo);
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sort', sort);

    return this.http.get<Page<Post>>(`${this.url}/buscar`, { params });
  }

  public criarPost(post: PostCreateDTO): Observable<string> {
    return this.http.post<string>(this.url, post);
  }

  public atualizarPost(post: PostUpdateDTO): Observable<void> {
    return this.http.put<void>(this.url, post);
  }

  public deletarPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
