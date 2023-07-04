import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {PhotosComponent} from "./components/photos/photos.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'photos',
        pathMatch: 'full'
      },
      {
        path: 'photos',
        component: PhotosComponent
      },
      {
        path: 'favourites',
        loadChildren: () => import('./components/favourites/favourites.module').then(m => m.FavouritesModule)
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
