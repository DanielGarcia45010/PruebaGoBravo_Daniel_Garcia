package com.example.rss.task;

import com.example.rss.service.RssAggregatorService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class RssJob {

    private final RssAggregatorService rssAggregatorService;

    public RssJob(RssAggregatorService rssAggregatorService) {
        this.rssAggregatorService = rssAggregatorService;
    }

    // Ejecuta cada 24 horas (86.400.000 ms)
    @Scheduled(fixedRate = 86400000)
    public void fetchFeeds() {
        rssAggregatorService.fetchAndStoreFeeds();
    }
}
