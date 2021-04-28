import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyFollowedTracksComponent } from './spotify-followed-tracks.component';

describe('SpotifyFollowedTracksComponent', () => {
  let component: SpotifyFollowedTracksComponent;
  let fixture: ComponentFixture<SpotifyFollowedTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyFollowedTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyFollowedTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
