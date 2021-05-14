import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MediaReelComponent } from './media-reel/media-reel.component';
import { DetailsComponent } from './details/details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { IndMediaReelComponent } from './ind-media-reel/ind-media-reel.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ContinueComponent } from './continue/continue.component';
import { LayoutModule } from '@angular/cdk/layout';

import { YouTubePlayerModule } from "@angular/youtube-player";

const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    MediaReelComponent,
    DetailsComponent,
    ReviewsComponent,
    IndMediaReelComponent,
    WatchlistComponent,
    ContinueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    YouTubePlayerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
