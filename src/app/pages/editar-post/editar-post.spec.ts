import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPost } from './editar-post';

describe('EditarPost', () => {
  let component: EditarPost;
  let fixture: ComponentFixture<EditarPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPost],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
