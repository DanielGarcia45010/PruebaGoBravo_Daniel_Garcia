import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedEntry } from '../models/feed-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeedEntries(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>('/entries.json');
  }
}

