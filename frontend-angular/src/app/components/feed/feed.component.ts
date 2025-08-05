import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { FeedEntry } from 'src/app/models/feed-entry.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  entries: FeedEntry[] = [];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getFeedEntries().subscribe((data: FeedEntry[]) => {
      this.entries = data
        .map(entry => ({
          ...entry,
          visited: false,
          expanded: false
        }))
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    });
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}


