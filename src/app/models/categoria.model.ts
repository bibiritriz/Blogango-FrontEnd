export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  slug: string;
  cor: string;
}

export interface CategoriaCreateDTO {
  nome: string;
  descricao: string;
}
