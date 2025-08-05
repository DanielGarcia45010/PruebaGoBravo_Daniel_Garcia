@RestController
@RequestMapping("/api")
public class FeedController {

    @GetMapping("/entries.json")
    public ResponseEntity<Resource> getEntries() throws IOException {
        Path filePath = Paths.get("entries.json").toAbsolutePath();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(resource);
    }
}
