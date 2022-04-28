package com.swrd1337.sokudo.api.services;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.swrd1337.sokudo.api.entities.Repository;
import com.swrd1337.sokudo.api.entities.RepositoryData;
import com.swrd1337.sokudo.api.repositories.ApiRepoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApiRepoService {
  
  private static final String DONE_COL_NAME = "Done";

  private static final String DOING_COL_NAME = "Doing";

  private static final String TO_DO_COL_NAME = "To Do";

  @Autowired
  private ApiRepoRepository repository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  public RepositoryData getRepositoryData(String owner, String repo) {
    return repository.findByOwnerNameAndRepoName(owner, repo);
  }

  public RepositoryData saveRepositoryData(Repository repo) {
    Set<String> defaultCols = new LinkedHashSet<String>(){{
      add(TO_DO_COL_NAME);
      add(DOING_COL_NAME);
      add(DONE_COL_NAME);
    }};

    RepositoryData repositoryData = new RepositoryData(
      repo.getOwner().getLogin(),
      repo.getName(),
      repo.getDefaultBranch(),
      repo.getVisibility(),
      defaultCols,
      DONE_COL_NAME
    );
    repositoryData.setId(sequenceGeneratorService.generateSequence(RepositoryData.SEQUENCE_NAME));

    return repository.save(repositoryData);
  }

  public RepositoryData updateRepositoryData(RepositoryData newRepositoryData) {
    return repository.save(newRepositoryData);
  }

}
