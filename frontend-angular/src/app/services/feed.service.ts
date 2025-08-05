import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedEntry } from '../models/feed-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private jsonUrl = '/entries.json';

  constructor(private http: HttpClient) {}

  getFeed(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>(this.jsonUrl);
  }
}
