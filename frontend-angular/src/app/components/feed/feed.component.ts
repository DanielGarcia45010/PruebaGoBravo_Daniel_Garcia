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
  expandedEntry: FeedEntry | null = null;
  visitedLinks = new Set<string>();

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getFeedEntries().subscribe(data => {
      this.entries = data.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    });
  }

  toggleContent(entry: FeedEntry): void {
    this.expandedEntry = this.expandedEntry === entry ? null : entry;
  }

  markAsVisited(link: string): void {
    this.visitedLinks.add(link);
  }

  isVisited(link: string): boolean {
    return this.visitedLinks.has(link);
  }
}

