import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Convert, Search } from '../search';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  sendSearch(search: Search): void {

    const bodyString: string = Convert.searchToJson(search);

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options: any = {
      headers: headers
    };

    this.http.post('https://search-dot-relational-image-map-dev.appspot.com/', bodyString, options).subscribe();
  }

}
