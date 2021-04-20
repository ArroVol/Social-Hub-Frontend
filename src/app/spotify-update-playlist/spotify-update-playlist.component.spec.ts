import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyUpdatePlaylistComponent } from './spotify-update-playlist.component';

describe('SpotifyUpdatePlaylistComponent', () => {
  let component: SpotifyUpdatePlaylistComponent;
  let fixture: ComponentFixture<SpotifyUpdatePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyUpdatePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyUpdatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
