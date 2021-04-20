import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyCreatePlaylistComponent } from './spotify-create-playlist.component';

describe('SpotifyCreatePlaylistComponent', () => {
  let component: SpotifyCreatePlaylistComponent;
  let fixture: ComponentFixture<SpotifyCreatePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyCreatePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyCreatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
