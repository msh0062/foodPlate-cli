import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodUrl: string = 'http://localhost:3004/foodItems';
  foodRequest = new HttpRequest('GET', this.foodUrl, {reportProgress: true});

  loadFood() {
    return this.http.get(this.foodUrl);
  }

  getFoodsProgress() {
    this.http.request(this.foodRequest).subscribe(event => {
      const toatalBytes = 53370429;
      if(event.type === HttpEventType.DownloadProgress) {
        const percentDone = Math.round(100 * event. loaded / toatalBytes);
        console.log(`File is ${percentDone} downloaded.`)
      } else if (event instanceof HttpResponse) {
        console.log(`File is completely downloaded`)
      }
    });
  }

  constructor(private http: HttpClient) { 
  }
}
