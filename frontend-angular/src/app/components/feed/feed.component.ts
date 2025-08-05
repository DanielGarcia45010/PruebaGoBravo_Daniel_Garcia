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
    this.feedService.getFeedEntries().subscribe((data: FeedEntry[]) => {
  this.entries = data
    .map(entry => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(entry.description || '', 'text/html');
      const textContent = htmlDoc.body.textContent || '';
      const summary = textContent.trim().slice(0, 250); 

      return {
        ...entry,
        summary: summary || entry.title, 
        visited: false,
        expanded: false
      };
    })
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
});
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}


