import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingMenu } from './floating-menu';

describe('FloatingMenu', () => {
  let component: FloatingMenu;
  let fixture: ComponentFixture<FloatingMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
