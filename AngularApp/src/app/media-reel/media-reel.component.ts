import { Component, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { MediaReelService } from '../trending-movies.service'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {Router} from '@angular/router';

@Component({
  selector: 'app-media-reel',
  templateUrl: './media-reel.component.html',
  styleUrls: ['./media-reel.component.css']
})
export class MediaReelComponent {

  @Input() child: string;

  allMedia = new Array(6);
  mediaLabels = ["Popular Movies", "Top Rated Movies", "Trending Movies", "Popular TV Shows", "Top Rated TV Shows", "Trending TV Shows"];

  mobile;

  constructor(private mediaReel: MediaReelService, public bpObserver: BreakpointObserver, private router: Router) 
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

  
      this.mediaReel.pop_movies()
      .subscribe(ret => {this.allMedia[0] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

      this.mediaReel.top_movies()
      .subscribe(ret => {this.allMedia[1] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

      this.mediaReel.trend_movies()
      .subscribe(ret => {this.allMedia[2] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

      this.mediaReel.pop_tv()
      .subscribe(ret => {this.allMedia[3] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

      this.mediaReel.top_tv()
      .subscribe(ret => {this.allMedia[4] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

      this.mediaReel.trend_tv()
      .subscribe(ret => {this.allMedia[5] = (this.mobile) ? this.simpleArray(ret) : (this.createReel(ret)); });

    })
  }

  simpleArray(data)
  {
    let straghtData = [];
    for (let d of data)
      straghtData.push(d);

    return straghtData;
  }

  createReel(data) 
  {
    var media = [];
    var count = 0;
        var page = [];
        for (var m of data)
        {
          if (count == 6)
          {
            if (page.length > 0)
              media.push(page);
            count = 0;
            page = [];
          }

          page.push(m);
          count+=1;
        }
        if (page.length > 0)
          media.push(page);
    return media;
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
    console.log(media);
    this.router.navigate([`${'./watch/'}${media.mediaType}${'/'}${media.id}`]);
  }
}
