import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowAwayPageComponent } from './throw-away-page.component';

describe('ThrowAwayPageComponent', () => {
  let component: ThrowAwayPageComponent;
  let fixture: ComponentFixture<ThrowAwayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThrowAwayPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThrowAwayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
