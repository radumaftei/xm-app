import {Component, HostListener, OnInit} from '@angular/core';
import {PhotosService} from "./photos.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  numberOfCards$ = this.photosService.numberOfCards$;

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photosService.resetPhotos();
    this.photosService.loadPhotos();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.photosService.loadPhotos();
    }
  }
}
