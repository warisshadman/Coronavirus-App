import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  private url = environment.api_url;
  private alternateUrl = environment.alternate_api_url

  constructor (private http: HttpClient) {

  }

  getData() {
    return this.http.get(`${this.url}/state_district_wise.json`)
  }

  getStateWiseData() {
    return this.http.get(`${this.url}/v4/data.json`)
  }

  getIndiaData() {
    return this.http.get(`${this.alternateUrl}/data`)
  }
}
