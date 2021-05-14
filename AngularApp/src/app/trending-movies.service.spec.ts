import { TestBed } from '@angular/core/testing';

import { MediaReelService } from './trending-movies.service';

describe('TrendingMoviesService', () => {
  let service: MediaReelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaReelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
