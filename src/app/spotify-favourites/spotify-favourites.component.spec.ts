import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyFavouritesComponent } from './spotify-favourites.component';

describe('SpotifyFavouritesComponent', () => {
  let component: SpotifyFavouritesComponent;
  let fixture: ComponentFixture<SpotifyFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
