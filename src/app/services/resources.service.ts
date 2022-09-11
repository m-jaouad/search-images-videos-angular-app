import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  hits!: any[];

  constructor(private httpClient: HttpClient) {}

  getResources(keyWord: string, page: number = 1) {
    let newKeyWord: string = '';
    let listOfWords = keyWord.split(' ');
    newKeyWord = listOfWords[0];
    for (let i: number = 1; i < listOfWords.length; i++) {
      newKeyWord += '+' + listOfWords[i];
    }
    console.log('new key word is :' + newKeyWord);

    return this.httpClient.get<any>(
      environment.url +
        '&q=' +
        newKeyWord +
        '&image_type=photo' +
        '&page=' +
        page
    );
  }
}
