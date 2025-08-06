import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Entry {
  title: string;
  link: string;
  summary: string;
  pubDate: string;
  cleanedDescription: string;
  image?: string;
  visited?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  entries: Entry[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Entry[]>('/api/entries.json').subscribe((data) => {
      this.entries = data.map((entry) => ({
        ...entry,
        visited: false,
        expanded: false,
      }));
    });
  }

  get filteredEntries(): Entry[] {
    return this.entries.filter((entry) =>
      entry.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  markAsVisited(entry: Entry): void {
    entry.visited = true;
  }

  toggleExpanded(entry: Entry): void {
    entry.expanded = !entry.expanded;
  }
}
