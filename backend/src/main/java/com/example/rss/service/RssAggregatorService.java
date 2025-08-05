package com.example.rss.service;

import com.rometools.rome.feed.synd.*;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RssAggregatorService {

    private static final List<String> FEED_URLS = List.of(
            "https://dev.to/feed/tag/javascript",
            "https://hnrss.org/newest",
            "https://www.genbeta.com/feedburner.xml"
    );

    public void generateJsonFeed() {
        List<Map<String, Object>> allEntries = new ArrayList<>();

        for (String feedUrl : FEED_URLS) {
            try {
                URL url = new URL(feedUrl);
                SyndFeedInput input = new SyndFeedInput();
                SyndFeed feed = input.build(new XmlReader(url));

                for (SyndEntry entry : feed.getEntries()) {
                    Map<String, Object> data = new HashMap<>();
                    data.put("title", entry.getTitle());
                    data.put("link", entry.getLink());
                    data.put("summary", entry.getDescription() != null ? entry.getDescription().getValue() : "");
                    data.put("content", entry.getContents().isEmpty() ? data.get("summary") : entry.getContents().get(0).getValue());
                    data.put("published", entry.getPublishedDate() != null ? entry.getPublishedDate().toInstant().toString() : "");

                    Optional<String> imageUrl = entry.getEnclosures().stream()
                            .filter(e -> e.getType().startsWith("image/"))
                            .map(SyndEnclosure::getUrl)
                            .findFirst();
                    imageUrl.ifPresent(img -> data.put("imageUrl", img));

                    allEntries.add(data);
                }

            } catch (Exception e) {
                System.err.println("Error fetching/parsing feed: " + feedUrl);
                e.printStackTrace();
            }
        }

        List<Map<String, Object>> sorted = allEntries.stream()
                .sorted((a, b) -> String.valueOf(b.get("published")).compareTo(String.valueOf(a.get("published"))))
                .collect(Collectors.toList());

        try {
            Path output = Paths.get("src/main/resources/static/entries.json");
            Files.createDirectories(output.getParent());
            try (BufferedWriter writer = Files.newBufferedWriter(output)) {
                writer.write(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(sorted));
                System.out.println("entries.json generado exitosamente");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}