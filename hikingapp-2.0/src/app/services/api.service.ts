import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = '6187b1fdd389465ba42fda07260e5207';

  constructor(private httpClient: HttpClient) { }

  getNews(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=ie&apiKey=${this.API_KEY}`);
  }
}