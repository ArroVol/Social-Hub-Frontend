import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAddplaylistWarningComponent } from './spotify-addplaylist-warning.component';

describe('SpotifyAddplaylistWarningComponent', () => {
  let component: SpotifyAddplaylistWarningComponent;
  let fixture: ComponentFixture<SpotifyAddplaylistWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyAddplaylistWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyAddplaylistWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
