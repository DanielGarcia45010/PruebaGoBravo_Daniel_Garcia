import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedEntry } from '../models/feed-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiUrl = '/api/entries.json';

  constructor(private http: HttpClient) {}

  getFeedEntries(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>(this.apiUrl);
  }
}
