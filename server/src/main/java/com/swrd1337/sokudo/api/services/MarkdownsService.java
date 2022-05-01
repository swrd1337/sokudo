package com.swrd1337.sokudo.api.services;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Markdown;
import com.swrd1337.sokudo.api.repositories.MarkdownsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MarkdownsService {
  
  @Autowired
  private MarkdownsRepository markdownsRepository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  public Markdown saveMarkdown(Markdown markdown) {
    Markdown newMarkdown = new Markdown(
        sequenceGeneratorService.generateSequence(Markdown.SEQUENCE_NAME),
        markdown.getRepoId(),
        markdown.getTitle(),
        markdown.getContent(),
        markdown.getAuthor()
    );
    return markdownsRepository.save(newMarkdown);
  }

  public List<Markdown> getMarkdowns(Long repoId) {
    return markdownsRepository.findAllByRepoId(repoId);
  }

  public Markdown updateMarkdown(Long markdownId, Markdown markdown) throws NotFoundException {
    return markdownsRepository.findById(markdownId)
        .map(
            existingMarkdown -> {
              existingMarkdown.setTitle(markdown.getTitle());
              existingMarkdown.setContent(markdown.getContent());
              return markdownsRepository.save(existingMarkdown);
            })
        .orElseThrow(NotFoundException::new);
  }

  public void deleteMarkdown(Long markdownId) {
    markdownsRepository.deleteById(markdownId);
  }

}
