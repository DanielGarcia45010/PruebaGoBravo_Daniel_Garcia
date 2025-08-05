package rss;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rometools.rome.feed.synd.*;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import org.jsoup.Jsoup;

import java.io.*;
import java.net.URL;
import java.nio.file.*;
import java.util.*;

public class Aggregator {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(new File("feeds/feeds.json"));
        List<String> feedUrls = new ArrayList<>();
        for (JsonNode node : root.get("feeds")) {
            feedUrls.add(node.asText());
        }

        List<Map<String, Object>> items = new ArrayList<>();

        for (String url : feedUrls) {
            try (XmlReader reader = new XmlReader(new URL(url))) {
                SyndFeed feed = new SyndFeedInput().build(reader);
                for (SyndEntry entry : feed.getEntries()) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("title", entry.getTitle());
                    map.put("link", entry.getLink());
                    map.put("date", entry.getPublishedDate() != null ? entry.getPublishedDate().getTime() : null);
                    map.put("summary", Jsoup.parse(entry.getDescription() != null ? entry.getDescription().getValue() : "").text());
                    map.put("content", Jsoup.parse(
                            !entry.getContents().isEmpty() ? entry.getContents().get(0).getValue() :
                            entry.getDescription() != null ? entry.getDescription().getValue() : "").text());

                    items.add(map);
                }
            } catch (Exception e) {
                System.err.println("Error leyendo: " + url);
            }
        }

        items.sort(Comparator.comparingLong(e -> e.get("date") != null ? (long) e.get("date") : 0).reversed());

        Files.createDirectories(Paths.get("output"));
        mapper.writerWithDefaultPrettyPrinter().writeValue(Paths.get("output/entries.json").toFile(), items);
    }
}
