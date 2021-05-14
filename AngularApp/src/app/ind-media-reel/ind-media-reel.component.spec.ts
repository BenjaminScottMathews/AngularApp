import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndMediaReelComponent } from './ind-media-reel.component';

describe('IndMediaReelComponent', () => {
  let component: IndMediaReelComponent;
  let fixture: ComponentFixture<IndMediaReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndMediaReelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndMediaReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
