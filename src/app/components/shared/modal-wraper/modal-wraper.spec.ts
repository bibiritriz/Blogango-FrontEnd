import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWraper } from './modal-wraper';

describe('ModalWraper', () => {
  let component: ModalWraper;
  let fixture: ComponentFixture<ModalWraper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWraper],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWraper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
