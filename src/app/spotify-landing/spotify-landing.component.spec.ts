import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyLandingComponent } from './spotify-landing.component';

describe('SpotifyLandingComponent', () => {
  let component: SpotifyLandingComponent;
  let fixture: ComponentFixture<SpotifyLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
