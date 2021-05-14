import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaReelComponent } from './media-reel.component';

describe('MediaReelComponent', () => {
  let component: MediaReelComponent;
  let fixture: ComponentFixture<MediaReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaReelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
