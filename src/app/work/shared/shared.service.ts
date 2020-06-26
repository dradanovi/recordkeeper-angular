import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  checkSubject(): Observable<string> {
    return this.httpClient.get('http://localhost:8080/api/work/subject/check', {responseType: 'text'});
  }

  checkWork(): Observable<string> {
    console.log("cheackWork method")
    return this.httpClient.get('http://localhost:8080/api/work/hours/check', {responseType: 'text'});
  }

  endSubject(): Observable<string> {
    return this.httpClient.post('http://localhost:8080/api/work/subject/close', null, { responseType: 'text' });
  }
}
