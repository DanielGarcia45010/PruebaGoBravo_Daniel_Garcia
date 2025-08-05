import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getEntries(): Observable<any> {
    return this.http.get('/api/entries.json');
  }
}

