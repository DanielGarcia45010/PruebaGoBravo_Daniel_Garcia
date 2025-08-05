import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeedEntry } from '../models/feed-entry.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private feedUrl = '/entries.json';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>(this.feedUrl);
  }
}