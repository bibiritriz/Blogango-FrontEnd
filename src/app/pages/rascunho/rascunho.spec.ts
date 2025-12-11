import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rascunho } from './rascunho';

describe('Rascunho', () => {
  let component: Rascunho;
  let fixture: ComponentFixture<Rascunho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rascunho],
    }).compileComponents();

    fixture = TestBed.createComponent(Rascunho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
