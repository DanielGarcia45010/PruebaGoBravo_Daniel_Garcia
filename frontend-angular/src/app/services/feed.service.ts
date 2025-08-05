import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getEntries(): Observable<FeedEntry[]> {
  return this.http.get<FeedEntry[]>('http://localhost:8080/api/entries.json');
}
}

