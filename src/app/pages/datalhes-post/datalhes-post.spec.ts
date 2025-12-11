import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatalhesPost } from './datalhes-post';

describe('DatalhesPost', () => {
  let component: DatalhesPost;
  let fixture: ComponentFixture<DatalhesPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatalhesPost],
    }).compileComponents();

    fixture = TestBed.createComponent(DatalhesPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
