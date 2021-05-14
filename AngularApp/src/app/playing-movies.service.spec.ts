import { TestBed } from '@angular/core/testing';

import { PlayingMoviesService } from './playing-movies.service';

describe('PlayingMoviesService', () => {
  let service: PlayingMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayingMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
