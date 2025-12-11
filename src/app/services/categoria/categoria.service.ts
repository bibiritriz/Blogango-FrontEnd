import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, CategoriaCreateDTO } from '../../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly http = inject(HttpClient);

  private readonly url = 'http://localhost:8080/api/categorias';

  public criarCategoria(categoria: CategoriaCreateDTO): Observable<string> {
    return this.http.post<string>(this.url, categoria);
  }

  public obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }
}
