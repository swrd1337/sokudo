package com.swrd1337.sokudo.api.repositories;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Markdown;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MarkdownsRepository extends MongoRepository<Markdown, Long>{
  
  List<Markdown> findAllByRepoId(Long repoId);

}
