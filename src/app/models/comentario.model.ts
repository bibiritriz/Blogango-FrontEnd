export interface Comentario {
  id: string;
  postId: string;
  autor: string;
  usuario: string;
  conteudo: string;
  dataCriacao: Date;
  aprovado: boolean;
}

export interface ComentarioUpdateDTO {
  autor: string;
  usuario: string;
  conteudo: string;
}

export interface ComentarioCreateDTO extends ComentarioUpdateDTO {
  postId: number;
}
