export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
}

export interface CategoriaCreateDTO {
  nome: string;
  descricao: string;
}
