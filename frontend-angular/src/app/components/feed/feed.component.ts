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
      const doc = parser.parseFromString(entry.description || '', 'text/html');
      
      // Quitar texto técnico del contenido
      const cleanedText = doc.body.textContent
        ?.replace(/Article URL:.*/gi, '')
        .replace(/Comments URL:.*/gi, '')
        .replace(/Points:.*/gi, '')
        .replace(/# Comments:.*/gi, '')
        .trim() || '';

      const summary = cleanedText.slice(0, 200); // un párrafo breve

      // Extraer imagen si existe
      const imgEl = doc.querySelector('img');
      const image = imgEl ? imgEl.src : null;

      return {
        ...entry,
        summary,
        cleanedDescription: cleanedText,
        image,
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


