import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePostArchiveComponent } from './one-post-archive.component';

describe('OnePostArchiveComponent', () => {
  let component: OnePostArchiveComponent;
  let fixture: ComponentFixture<OnePostArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePostArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePostArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
