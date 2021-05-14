import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';
import { CastService } from '../cast.service';
import { PersonService } from '../person.service';
import { LocalstoreService } from '../localstore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  id; type; childString;
  allDetails; castList;
  safeURL; timeString; genreString; langString;
  added;
  addAlert = false;
  remAlert = false;
  tweetString; fbString;
  

  localInfo; ls;
  myArray = null;
  myContinue = [];
  alreadyInContinue = false;


  mobile;

  constructor(private route: ActivatedRoute, private details: DetailsService, private localService: LocalstoreService, public bpObserver: BreakpointObserver,
    private cast: CastService, private sanitizer: DomSanitizer, private modalService: NgbModal, private personService: PersonService) 
  {
    this.route.params.subscribe(params =>
    {
      this.type = params['type'];
      this.id = params['id'];
      this.childString = `${this.type}${'/'}${this.id}`;

      this.details.details_get('/'+this.type+'/'+this.id+'/')
      .subscribe(ret => 
        {
          this.allDetails = ret;
          console.log(this.allDetails);
          this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.allDetails.link);
          this.timeString = this.runtime(this.allDetails.runtime);
          this.genreCalc(this.allDetails.genres);
          this.langCalc(this.allDetails.languages);
          this.tweetString = encodeURIComponent(`${this.allDetails.title}${'\n'}${this.allDetails.link.replace('embed/', 'watch?v=')}${'\n'}${'#USC #CSCI571 #FightOn'}`);
          this.fbString = `${'https://www.facebook.com/sharer/sharer.php?u='}${this.allDetails.link.replace('embed/', 'watch?v=')}${'&amp;src=sdkpreparse'}`;

          this.added = false;
          this.localInfo = {'id':this.id, 'title': this.allDetails.title, 'poster' : this.allDetails.poster, 'mediaType' : this.type};
          this.ls = window.localStorage;

          //Work on Watchlist Section
          if (this.ls.getItem('list') != null)
          {
            this.myArray = JSON.parse(this.ls.getItem('list'));
            for (let i=0; i<this.myArray.length; i++)
            {
              if (this.myArray[i].id == this.id)
              {
                this.added = true;
                this.myArray.splice(i, 1);
                this.myArray.unshift(this.localInfo);
                this.ls.setItem('list', JSON.stringify(this.myArray));
              }
            }
          }

          this.localService.set_storage_empty(false);
          this.alreadyInContinue = false;

          if (this.ls.getItem('continue') != null)
            this.myContinue = JSON.parse(this.ls.getItem('continue'));
            
          if (this.myContinue.length <= 24)
            for (let i=0; i<this.myContinue.length; i++)
              if (this.myContinue[i].id == this.id)
                this.alreadyInContinue = true;
          
          if (!this.alreadyInContinue)
          {
            this.myContinue.unshift(this.localInfo);
            this.ls.setItem('continue', JSON.stringify(this.myContinue));
            this.localService.set_storage_empty(false);
          }
        });
      
      this.cast.get_cast('/'+this.type+'/'+this.id+'/')
      .subscribe(ret =>{this.castList = ret;})
    });
    
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
  }

  runtime(totalMins)
  {
    if (totalMins == 0)
      return "";
    if (isNaN(totalMins))
    {
      totalMins = totalMins[0];
      if (isNaN(totalMins))
        return "";
    }
    let hrs = Math.floor(totalMins/60);
    let mins = totalMins%60;
    let minsString = mins==1 ? "min" : "mins"
    
    if (mins == 0)
      return (hrs+"hrs");
    if (hrs == 0)
      return (mins+minsString);
      
    return (hrs+"hrs "+mins+minsString);
  }

  genreCalc(genres)
  {
    this.genreString = '';
    for (let i=0; i<genres.length; i++)
      this.genreString += genres[i] + ((i == genres.length-1) ? "" : ", "); 
  }

  langCalc(langs)
  {
    this.langString = '';
    for (let i=0; i<langs.length; i++)
      this.langString += langs[i] + ((i == langs.length-1) ? "" : ", "); 
  }

  addToWatch(media)
  {
    this.added = true;
    this.addAlert = true;
    if (this.myArray != null)
      this.myArray.unshift(this.localInfo);
    else
      this.myArray = [this.localInfo];
    this.ls.setItem('list', JSON.stringify(this.myArray));
    setTimeout(() => {this.closeAlert();}, 5000);
  }

  removeFromWatch(media)
  {
    this.added = false;
    this.remAlert = true;
    this.myArray.shift();
    this.ls.setItem('list', JSON.stringify(this.myArray));
    setTimeout(() => {this.closeAlert();}, 5000);
  }

  closeAlert() 
  {
    if (this.addAlert)
      this.addAlert=false;
    else if (this.remAlert)
      this.remAlert = false;
  }

  oldDetails;
  newDetails;
  imdb;
  openModal(content, person)
  {
    this.oldDetails = person;
    this.personService.get_person(person.id)
    .subscribe(ret =>
      {
        this.newDetails = ret;
        this.imdb = this.newDetails.imdb;
        this.modalService.open(content, { size: 'lg' });
      })
  }
}
