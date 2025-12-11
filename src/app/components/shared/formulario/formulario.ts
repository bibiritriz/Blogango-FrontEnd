import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { StatusPost } from '../../../models/status.model';
import { Categoria } from '../../../models/categoria.model';
import PostService from '../../../services/post/post.service';
import { Post, PostCreateDTO, PostUpdateDTO } from '../../../models/post.model';

import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class FormularioPost implements OnInit {
  private route = inject(ActivatedRoute);

  private postService = inject(PostService);

  private categoriaService = inject(CategoriaService);

  private formBuilder = inject(FormBuilder);

  private router = inject(Router);

  private toast = inject(HotToastService);

  title: string = '';

  isEdicao: boolean = false;

  post: Post | null = null;

  categoriasParaMostrar: Categoria[] | null = null;

  TodasAscategorias: Categoria[] | null = null;

  mostrandoSelecao: boolean = false;

  slugPost: string | null = null;

  formulario = this.formBuilder.group({
    titulo: ['', [Validators.required, Validators.minLength(10)]],
    conteudo: ['', [Validators.required, Validators.minLength(50)]],
    autor: [''],
    categorias: [[] as Categoria[], Validators.minLength(1)],
  });

  ngOnInit(): void {
    this.categoriaService.obterCategorias().subscribe({
      next: (resposta) => {
        this.TodasAscategorias = resposta;
      },
      error: (err) => console.log(err),
    });

    this.slugPost = this.route.snapshot.paramMap.get('slug');

    if (this.slugPost) {
      this.isEdicao = true;
      this.title = 'Editar Post';
      this.carregarDados();
    } else {
      this.title = 'Criar Post';
    }
  }

  mostrarCategorias() {
    this.mostrandoSelecao = !this.mostrandoSelecao;
  }

  alternarCategoria(categoriaClicada: Categoria) {
    const valoresAtuais = this.formulario.get('categorias')?.value || [];

    const selecionadas = [...valoresAtuais] as Categoria[];

    const index = selecionadas.findIndex((c) => c.id === categoriaClicada.id);

    if (index > -1) {
      selecionadas.splice(index, 1);
    } else {
      selecionadas.push(categoriaClicada);
    }

    this.formulario.get('categorias')?.setValue(selecionadas);
    this.formulario.get('categorias')?.markAsTouched();
  }

  estaSelecionada(categoria: Categoria): boolean {
    const valoresAtuais = this.formulario.get('categorias')?.value || [];

    const selecionadas = [...valoresAtuais] as Categoria[];
    return selecionadas ? selecionadas.some((c) => c.id === categoria.id) : false;
  }

  postar() {
    this.processarEnvio(StatusPost.PUBLICADO);
  }

  salvar() {
    this.processarEnvio(StatusPost.RASCUNHO);
  }

  processarEnvio(statusDoPost: StatusPost) {
    const dadosDoFormulario = this.formulario.getRawValue();
    if (this.formulario.valid) {
      if (this.isEdicao) {
        const postAtualizado: PostUpdateDTO = {
          titulo: dadosDoFormulario.titulo as string,
          conteudo: dadosDoFormulario.conteudo as string,
          autor: dadosDoFormulario.autor as string,
          categorias: dadosDoFormulario.categorias as Categoria[],
          status: statusDoPost,
        };
        this.postService
          .atualizarPost(postAtualizado)
          .pipe(this.toast.observe({ success: 'Post atualizado!' }))
          .subscribe({
            next: () => {
              this.formulario.reset();
            },
          });
      } else {
        const postParaCriar: PostCreateDTO = {
          titulo: dadosDoFormulario.titulo as string,
          conteudo: dadosDoFormulario.conteudo as string,
          autor: dadosDoFormulario.autor as string,
          categorias: dadosDoFormulario.categorias as Categoria[],
          status: statusDoPost,
        };
        this.postService
          .criarPost(postParaCriar)
          .pipe(this.toast.observe({ success: 'Post criado!' }))
          .subscribe({
            next: () => {
              this.formulario.reset();
            },
          });
      }
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/posts']);
  }

  carregarDados() {
    if (this.slugPost) {
      this.postService.obterPostPorSlug(this.slugPost).subscribe({
        next: (resposta) => {
          this.post = resposta;

          this.categoriasParaMostrar = this.post.categorias;

          this.formulario.patchValue({
            titulo: this.post.titulo,
            autor: this.post.autor,
            conteudo: this.post.conteudo,
            categorias: this.post.categorias,
          });
        },
        error: (err) => console.log(err),
      });
    }
  }
}
