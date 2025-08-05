import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeedEntry {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {}

  getFeedEntries(): Observable<FeedEntry[]> {
    return this.http.get<FeedEntry[]>('/api/entries.json');
  }
}
