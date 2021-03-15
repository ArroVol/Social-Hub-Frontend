import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramSearchComponent } from './instagram-search.component';

describe('InstagramSearchComponent', () => {
  let component: InstagramSearchComponent;
  let fixture: ComponentFixture<InstagramSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstagramSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
