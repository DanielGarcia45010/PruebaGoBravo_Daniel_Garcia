package com.example.rss.service;

import com.rometools.rome.feed.synd.*;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;


import java.io.FileWriter;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class RssAggregatorService {

    private static final List<String> FEED_URLS = Arrays.asList(
        "https://dev.to/feed/tag/javascript",
        "https://hnrss.org/newest",
        "https://www.genbeta.com/feedburner.xml"
    );
    @Scheduled(cron = "0 0 0 * * ?")
    public void fetchAndStoreFeeds() {
        List<SyndEntry> allEntries = new ArrayList<>();

        for (String url : FEED_URLS) {
            try {
                SyndFeedInput input = new SyndFeedInput();
                SyndFeed feed = input.build(new XmlReader(new URL(url)));
                allEntries.addAll(feed.getEntries());
            } catch (Exception e) {
                System.err.println("Error leyendo fuente: " + url);
                e.printStackTrace();
            }
        }

        allEntries.sort((a, b) -> {
            Date dateA = a.getPublishedDate() != null ? a.getPublishedDate() : new Date(0);
            Date dateB = b.getPublishedDate() != null ? b.getPublishedDate() : new Date(0);
            return dateB.compareTo(dateA);
        });

        List<Map<String, Object>> jsonEntries = new ArrayList<>();
        for (SyndEntry entry : allEntries) {
            Map<String, Object> obj = new HashMap<>();
            obj.put("title", entry.getTitle());
            obj.put("link", entry.getLink());
            obj.put("pubDate", entry.getPublishedDate() != null ? entry.getPublishedDate().toString() : "");
            obj.put("description", entry.getDescription() != null ? entry.getDescription().getValue() : "");

            if (!entry.getEnclosures().isEmpty()) {
                obj.put("image", entry.getEnclosures().get(0).getUrl());
            }

            jsonEntries.add(obj);
        }

        try {
            Files.createDirectories(Paths.get("src/main/resources/static"));
            FileWriter file = new FileWriter("src/main/resources/static/entries.json");
            file.write(new com.fasterxml.jackson.databind.ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(jsonEntries));
            file.close();
            System.out.println("✅ Archivo entries.json generado correctamente.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
