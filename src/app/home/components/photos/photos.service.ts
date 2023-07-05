import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DEFAULT_PHOTOS_NUMBER, LOCAL_STORAGE_KEY} from "../../../shared/constants";
import {Utils} from "../../../utils";

export interface ImageData {
  id: number;
  url: string;
  blob?: Blob;
  base64Data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  favourites: ImageData[] = [];

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

  createImageData(id: number, blob: Blob): ImageData {
    const url = Utils.translateImage(blob);
    return { id, url, blob };
  }

  async addImageToFavourites(localImage: Blob) {
    const imageData = this.createImageData(
      Utils.getRandomNumber(1, 2000000),
      localImage
    );

    this.favourites.push(imageData);
    this.saveImagesToLocalStorage();
  }

  async saveImagesToLocalStorage() {
    const imagePromises = this.favourites.map(async imageData => {
      const base64Data = await Utils.blobToBase64(imageData.blob!);
      return { id: imageData.id, base64Data };
    });

    const dataToSave = await Promise.all(imagePromises);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }

  removeImage(id: number) {
    const index = this.favourites.findIndex(image => image.id === id);
    if (index !== -1) {
      const imageData = this.favourites[index];
      URL.revokeObjectURL(imageData.url);
      this.favourites.splice(index, 1);
      this.saveImagesToLocalStorage();
    }
  }

  loadImagesFromLocalStorage() {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const imageDataArray = JSON.parse(storedData);
      this.favourites = imageDataArray.map((imageData: ImageData) => ({
        id: imageData.id,
        url: imageData.base64Data
      }));
    }
  }
}
