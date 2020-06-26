import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private httpClient: HttpClient) { }

  public uploadImage(image: File): Observable<Object> {
    const formData = new FormData();

    formData.append('image', image);

    return this.httpClient.post('http://localhost:8080/api/admin/user/img/save', formData, { responseType: 'arraybuffer' });
  }
}
