import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAddplaylistSnackbarComponent } from './spotify-addplaylist-snackbar.component';

describe('SpotifyAddplaylistSnackbarComponent', () => {
  let component: SpotifyAddplaylistSnackbarComponent;
  let fixture: ComponentFixture<SpotifyAddplaylistSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyAddplaylistSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyAddplaylistSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
