import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedEntry } from '../models/feed-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private feedUrl = '/api/entries.json';

  constructor(private http: HttpClient) {}

  getFeedEntries(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>(this.feedUrl);
  }
}
