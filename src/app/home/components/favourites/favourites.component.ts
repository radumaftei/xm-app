import { Component } from '@angular/core';
import {PhotosService} from "../photos/photos.service";
import {Utils} from "../../../utils";
import {LOCAL_STORAGE_KEY} from "../../../shared/constants";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  favouriteImages = Utils.getFromLocalStorageAsObj(LOCAL_STORAGE_KEY);
}
