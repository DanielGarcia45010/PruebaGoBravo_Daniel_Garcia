// src/app/services/feed.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedEntry } from '../models/feed-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getEntries(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>('/api/entries.json');  // usa proxy
  }
}
