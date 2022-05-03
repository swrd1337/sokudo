package com.swrd1337.sokudo.api.services;

import java.util.LinkedHashSet;
import java.util.Set;

import com.swrd1337.sokudo.api.dto.RepositoryDTO;
import com.swrd1337.sokudo.api.entities.Board;
import com.swrd1337.sokudo.api.entities.RepositoryData;
import com.swrd1337.sokudo.api.repositories.ApiRepoRepository;
import com.swrd1337.sokudo.api.repositories.BoardsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApiRepoService {
  
  private static final String DEFAULT_BOARD_NAME = "Default";

  private static final String DONE_COL_NAME = "Done";

  private static final String DOING_COL_NAME = "Doing";

  private static final String TO_DO_COL_NAME = "To Do";

  @Autowired
  private ApiRepoRepository repository;
  
  @Autowired
  private BoardsRepository boardsRepository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;


  public RepositoryData getRepositoryData(String owner, String repo) {
    return repository.findByOwnerNameAndRepoName(owner, repo);
  }

  public RepositoryData saveRepositoryData(RepositoryDTO repo) {
    Set<String> defaultCols = new LinkedHashSet<String>(){{
      add(TO_DO_COL_NAME);
      add(DOING_COL_NAME);
      add(DONE_COL_NAME);
    }};

    RepositoryData repositoryData = new RepositoryData(
      repo.getOwner().getLogin(),
      repo.getName(),
      repo.getDefaultBranch(),
      repo.getVisibility()
    );

    long repoDataId = sequenceGeneratorService.generateSequence(RepositoryData.SEQUENCE_NAME);
    repositoryData.setId(repoDataId);

    Board defaultBoard = new Board(DEFAULT_BOARD_NAME, defaultCols, DONE_COL_NAME, repoDataId);
    defaultBoard.setId(sequenceGeneratorService.generateSequence(Board.SEQUENCE_NAME));
    boardsRepository.save(defaultBoard);

    repositoryData.getBoards().add(defaultBoard);
    return repository.save(repositoryData);
  }

}
