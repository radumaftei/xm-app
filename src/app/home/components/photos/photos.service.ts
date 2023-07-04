import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DEFAULT_PHOTOS_NUMBER, LOCAL_STORAGE_KEY} from "../../../shared/constants";
import {Utils} from "../../../utils";


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private readonly numberOfCardsSubject = new BehaviorSubject<number[]>([]);
  numberOfCards$ = this.numberOfCardsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getImageUrl(): Observable<Blob> {
    return this.httpClient.get(`https://picsum.photos/200/200?random=${Math.random()}`, {responseType: 'blob'});
  }

  loadPhotos(): void {
    this.numberOfCardsSubject.next(this.numberOfCardsSubject.getValue().concat(new Array(DEFAULT_PHOTOS_NUMBER)));
  }

  resetPhotos(): void {
    this.numberOfCardsSubject.next(new Array(DEFAULT_PHOTOS_NUMBER));
  }

  async addImageToFavourites(localImage: Blob) {
    const base64 = await Utils.blobToBase64(localImage);
    Utils.appendToKeyInLocalStorage(LOCAL_STORAGE_KEY, base64);
  }

  // removeImage(id: number) {
  //
  //   const index = this.images.findIndex(image => image.id === id);
  //   if (index !== -1) {
  //     const imageData = this.images[index];
  //     URL.revokeObjectURL(imageData.url);
  //     this.images.splice(index, 1);
  //   }
  // }

}
