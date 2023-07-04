import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import { PhotosComponent } from './components/photos/photos.component';
import {RouterOutlet} from "@angular/router";
import {HomeRoutingModule} from "./home-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [HomeComponent, PhotosComponent],
  imports: [
    CommonModule,
    RouterOutlet,

    HomeRoutingModule,
    ...MATERIAL_MODULES,
    SharedModule
  ],
})
export class HomeModule { }
