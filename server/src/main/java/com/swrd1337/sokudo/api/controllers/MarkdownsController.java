package com.swrd1337.sokudo.api.controllers;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Markdown;
import com.swrd1337.sokudo.api.services.MarkdownsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/markdown")
public class MarkdownsController {
  
  @Autowired
  private MarkdownsService markdownsService;

  @GetMapping("/{repoId}")
  public ResponseEntity<List<Markdown>> getMarkdowns(@PathVariable Long repoId) {
    List<Markdown> markdowns = markdownsService.getMarkdowns(repoId);
    return new ResponseEntity<>(markdowns, HttpStatus.OK);
  }

  @PutMapping(value = "/{markdownId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Markdown> updateMarkdown(@PathVariable Long markdownId, @RequestBody Markdown markdown) throws NotFoundException {
    Markdown updatedMarkdown = markdownsService.updateMarkdown(markdownId, markdown);
    return new ResponseEntity<>(updatedMarkdown, HttpStatus.OK);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Markdown> saveMarkdown(@RequestBody Markdown markdown) {
    Markdown savedMarkdown = markdownsService.saveMarkdown(markdown);
    return new ResponseEntity<>(savedMarkdown, HttpStatus.OK);
  }
  
  @DeleteMapping("/{markdownId}")
  public ResponseEntity<Void> deleteMarkdown(@PathVariable Long markdownId) throws NotFoundException {
    markdownsService.deleteMarkdown(markdownId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
