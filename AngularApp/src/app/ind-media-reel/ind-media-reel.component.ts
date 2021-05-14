import { Component, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { RecommendedService } from '../recommended.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ind-media-reel',
  templateUrl: './ind-media-reel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ind-media-reel.component.css']
})
export class IndMediaReelComponent implements OnChanges{

  @Input() child: string;

  allMedia = new Array(2);
  mediaLabels = ["Recommended Movies", "Similar Movies"];
  type;

  mobile; 
  constructor(private recommendedService: RecommendedService, public bpObserver: BreakpointObserver, private router: Router) {}

  ngOnChanges()
  {
    if (this.child.includes('movie'))
    {
      this.mediaLabels = ["Recommended Movies", "Similar Movies"];
    }
    else  
    {
      this.mediaLabels = ["Recommended TV Shows", "Similar TV Shows"];
    }

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

      
      this.recommendedService.get_recommendations(`${this.child}${'/recommendations'}`)
       .subscribe(ret => {this.allMedia[0] = (!this.mobile) ? ret : this.convertToSimple(ret);});
    
      this.recommendedService.get_recommendations(`${this.child}${'/similar'}`)
       .subscribe(ret => {this.allMedia[1] = (!this.mobile) ? ret : this.convertToSimple(ret);});
    })

    
  }

  convertToSimple(data)
  {
    let simpleArray = [];
    for (let m of data)
      for (let i of m)
        simpleArray.push(i);
    
    return simpleArray;
  }

  redirect(media: any)
  {
    console.log(media);
    this.router.navigate([`${'./watch/'}${media.mediaType}${'/'}${media.id}`]);
  }

}
