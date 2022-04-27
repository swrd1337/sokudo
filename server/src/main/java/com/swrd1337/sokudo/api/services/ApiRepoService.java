package com.swrd1337.sokudo.api.services;

import java.util.Arrays;
import java.util.HashSet;

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

  private static final int DEFAULT_DONE_CULUMN_INDEX = 2;

  @Autowired
  private ApiRepoRepository repository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  public RepositoryData getRepositoryData(String owner, String repo) {
    return repository.findByOwnerNameAndRepoName(owner, repo);
  }

  public RepositoryData saveRepositoryData(Repository repo) {
    RepositoryData repositoryData = new RepositoryData(
      repo.getOwner().getLogin(),
      repo.getName(),
      repo.getDefaultBranch(),
      repo.getVisibility(),
      new HashSet<String>(
        Arrays.asList(TO_DO_COL_NAME, DOING_COL_NAME, DONE_COL_NAME)
      ),
      DEFAULT_DONE_CULUMN_INDEX
    );

    repositoryData.setId(sequenceGeneratorService.generateSequence(RepositoryData.SEQUENCE_NAME));

    return repository.save(repositoryData);
  }

  public void updateRepositoryData(RepositoryData repositoryData) {
    // Pass
  }

}
