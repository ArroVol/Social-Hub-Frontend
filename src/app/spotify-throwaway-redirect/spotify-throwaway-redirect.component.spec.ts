import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyThrowawayRedirectComponent } from './spotify-throwaway-redirect.component';

describe('SpotifyThrowawayRedirectComponent', () => {
  let component: SpotifyThrowawayRedirectComponent;
  let fixture: ComponentFixture<SpotifyThrowawayRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyThrowawayRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyThrowawayRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
