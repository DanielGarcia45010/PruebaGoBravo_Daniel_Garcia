package com.example.rss.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FeedController {

    @GetMapping("/entries.json")
    public ResponseEntity<Resource> getEntries() throws IOException {
        Resource resource = new ClassPathResource("static/entries.json");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(resource);
    }
}
