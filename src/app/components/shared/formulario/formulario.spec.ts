import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPost } from './formulario';

describe('FormularioPost', () => {
  let component: FormularioPost;
  let fixture: ComponentFixture<FormularioPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPost],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
