import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const params = {
  access_key: '95085a1df367570ba5cfc8d47cb0149a',
  query: 'zagreb'
}

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private httpClient: HttpClient) { }

  getWeather(){
    return this.httpClient.get('http://api.weatherstack.com/current', {params})
}

}
