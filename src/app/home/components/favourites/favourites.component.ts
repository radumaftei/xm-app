import {Component, OnInit} from '@angular/core';
import {ImageData, PhotosService} from "../photos/photos.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favouriteImages: ImageData[] = [];

    constructor(private  photosService: PhotosService) {}

  ngOnInit() {
    this.photosService.loadImagesFromLocalStorage();
    this.favouriteImages = JSON.parse(JSON.stringify(this.photosService.favourites));
  }
}
