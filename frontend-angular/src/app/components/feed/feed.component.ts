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

          const text = doc.body.textContent || '';

          // Buscar contenido visible y eliminar etiquetas técnicas
          const cleanedText = text
            .replace(/Article URL:.*/gi, '')
            .replace(/Comments URL:.*/gi, '')
            .replace(/Points:.*/gi, '')
            .replace(/# Comments:.*/gi, '')
            .trim();

          // Si el texto limpio es muy corto, usar comentarios o fecha
          let summary = cleanedText.length > 40 ? cleanedText.slice(0, 200) : '';
          if (!summary) {
            const commentsMatch = text.match(/# Comments: \d+/i);
            const comments = commentsMatch ? commentsMatch[0] : '';
            summary = `${comments} · ${entry.pubDate}`;
          }

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
}