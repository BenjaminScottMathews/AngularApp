import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PlayingMoviesService } from '../playing-movies.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  movies = [];
  mobile;

  constructor(private playingMovies: PlayingMoviesService, public bpObserver: BreakpointObserver, private router: Router) 
  {
    this.bpObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe ((state: BreakpointState) =>
    {
      this.mobile = false;
      if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small])
        this.mobile = true;
    })

    this.playingMovies.movies_get()
    .subscribe(ret => 
      {
        this.movies = ret;
      });
  }
  
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  redirect(media: any)
  {
    this.router.navigate([`${'./watch/movie/'}${media.id}`]);
  }
}