import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePosts } from './lista-de-posts';

describe('ListaDePosts', () => {
  let component: ListaDePosts;
  let fixture: ComponentFixture<ListaDePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDePosts],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
