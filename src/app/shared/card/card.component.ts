import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  @Input() imageId?: number;
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
            })
          );
      }, Utils.getRandomNumber(200,300));
    }
  }

  getImageData(image: Blob) {
    return Utils.translateImage(image);
  }

  onPhotoClick(event: MouseEvent) {
    this.photosService.addImageToFavourites(this.currentImage);

    this._snackBar.open('Image added successfully', 'Close',
      {
        duration: 3000
      });
  }

  onFavouritePhotoClick() {
    this.router.navigate(['/', this.imageId])
  }
}
