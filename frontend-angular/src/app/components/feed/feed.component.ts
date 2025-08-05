import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';

interface FeedEntry {
  title: string;
  link: string;
  contentSnippet: string;
  content: string;
  isoDate: string;
  image?: string;
  expanded?: boolean;
  visited?: boolean;
}

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


  toggleContent(entry: FeedEntry): void {
    entry.expanded = !entry.expanded;
  }

  markAsVisited(entry: FeedEntry): void {
    entry.visited = true;
  }

  stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

}

