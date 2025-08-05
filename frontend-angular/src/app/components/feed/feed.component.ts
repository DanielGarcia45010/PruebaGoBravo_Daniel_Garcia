import { Component, OnInit } from '@angular/core';
import { FeedService, FeedEntry } from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {
  entries: FeedEntry[] = [];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getFeedEntries().subscribe({
      next: data => this.entries = data,
      error: err => console.error('Error loading feed:', err)
    });
  }
}

