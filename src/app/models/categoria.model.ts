export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
}

export interface CategoriaUpdateDTO {
  nome: string;
  descricao: string;
}
