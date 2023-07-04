export class Utils {
  static getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getFromLocalStorageAsObj(item: string) {
    const localStorageItem = localStorage.getItem(item);
    if (!localStorageItem) {
      return undefined;
    }
    return JSON.parse(localStorageItem);
  }

  static appendToKeyInLocalStorage(key: string, value: string) {
    const localStorageItem = localStorage.getItem(key);

    if (localStorageItem) {
      localStorage.setItem(key, JSON.stringify([...JSON.parse(localStorageItem), value]));
    } else {
      localStorage.setItem(key, JSON.stringify([value]));
    }
  }

  static translateImage(image: Blob): string {
    return URL.createObjectURL(image);
  }

  static blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
