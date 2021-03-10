import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl: string = "/assets/data/data.json";

  constructor(
    private http: HttpClient
  ) { }

  getDataList(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

}
