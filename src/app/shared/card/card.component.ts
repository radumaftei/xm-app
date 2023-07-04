import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../utils";
import {PhotosService} from "../../home/components/photos/photos.service";
import {Observable, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() imageUrl?: string;
  image$!: Observable<Blob>;

  currentImage!: Blob;

  constructor(private photosService: PhotosService, private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit() {
    if (!this.imageUrl) {
      setTimeout(() => {
        this.image$ = this.photosService.getImageUrl()
          .pipe(
            tap((e) => {
              this.currentImage = e;
              console.log('currentimage', this.currentImage.size);

            })
          );
      }, Utils.getRandomNumber(200,300));
    }
  }

  getUrlFromBlob(image: Blob) {
    return Utils.translateImage(image);
  }

  onPhotoClick(event: MouseEvent) {
    this.photosService.addImageToFavourites(this.currentImage);
    console.log('event', event)


    this._snackBar.open('Image added successfully', 'Close',
      {
        duration: 3000
      });
  }

  onFavouritePhotoClick() {
    this.router.navigate(['/favourites'])
  }
}
