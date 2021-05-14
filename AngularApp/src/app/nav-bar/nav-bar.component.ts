import { Component, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { SearchService } from '../search.service'


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent 
{
  search_response: any;

  constructor(private searchService: SearchService, private router: Router) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( searchText => this.searchService.searchbar_get(searchText)),
      (catchError( () => [])));

  input = (x: {title: string}) => x.title;

  redirect(media: any)
  {
    this.router.navigate([`${'./watch/'}${media.mediaType}${'/'}${media.id}`]);
  }
}


