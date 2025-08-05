import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { FeedEntry } from '../../models/feed-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  entries: FeedEntry[] = [];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getFeed().subscribe(data => {
      this.entries = data.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
    });
  }

  toggle(entry: FeedEntry): void {
    entry.visited = true;
    entry['expanded'] = !entry['expanded'];
  }
}