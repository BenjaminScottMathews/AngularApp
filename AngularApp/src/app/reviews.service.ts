import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  get_reviews(params): Observable<any>
  {
    const search_route_URL = 'https://secure-sorter-308001.wl.r.appspot.com/reviews/'+params;
    return this.http.get(search_route_URL);
  }
}
