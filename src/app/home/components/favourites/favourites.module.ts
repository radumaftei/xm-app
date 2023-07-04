import {NgModule} from "@angular/core";
import {FavouritesComponent} from "./favourites.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: FavouritesComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [FavouritesComponent],
  exports: [FavouritesComponent]
})

export class FavouritesModule {}
