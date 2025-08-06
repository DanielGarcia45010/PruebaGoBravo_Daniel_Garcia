export interface FeedEntry {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  summary?: string;
  image?: string;
  cleanedDescription?: string;
  visited?: boolean;
  expanded?: boolean;
}