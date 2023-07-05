import {NgModule} from "@angular/core";
import {FavouritesComponent} from "./favourites.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import { SinglePhotoComponent } from './single-photo/single-photo.component';

const routes: Routes = [
  {
    path: '',
    component: FavouritesComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: SinglePhotoComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [FavouritesComponent, SinglePhotoComponent],
  exports: [FavouritesComponent]
})

export class FavouritesModule {}
