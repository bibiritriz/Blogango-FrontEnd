import { Categoria } from './categoria.model';
import { StatusPost } from './status.model';

export interface Post {
  id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  categorias: Categoria[];
  dataCriacao: Date;
  dataAtualizacao: Date;
  status: StatusPost;
  visualizacoes: number;
  numeroComentarios: number;
}

export interface PostCreateDTO {
  titulo: string;
  conteudo: string;
  autor: string;
  status: StatusPost;
  categorias: Categoria[];
}

export type PostUpdateDTO = PostCreateDTO;
