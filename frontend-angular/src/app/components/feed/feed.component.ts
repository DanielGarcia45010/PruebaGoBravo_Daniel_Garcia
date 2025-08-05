import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  entries: any[] = [];

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getEntries().subscribe((data: any[]) => {
      this.entries = data;
    });
  }
}

