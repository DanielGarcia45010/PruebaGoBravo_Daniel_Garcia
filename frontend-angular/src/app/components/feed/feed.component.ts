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
    this.feedService.getFeedEntries().subscribe(data => this.entries = data);
  }
}
