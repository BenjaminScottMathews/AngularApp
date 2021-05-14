import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { DetailsComponent } from './details/details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = 
[
  {path: '', component: CarouselComponent},
  {path: 'watch/:type/:id', component: DetailsComponent},
  {path: 'mylist', component: WatchlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
