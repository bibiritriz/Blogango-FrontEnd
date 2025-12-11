import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPost } from './criar-post';

describe('CriarPost', () => {
  let component: CriarPost;
  let fixture: ComponentFixture<CriarPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPost],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
