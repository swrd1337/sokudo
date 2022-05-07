package com.swrd1337.sokudo.api.services;

import java.util.LinkedHashSet;
import java.util.Set;

import com.swrd1337.sokudo.api.entities.Board;
import com.swrd1337.sokudo.api.repositories.ApiRepoRepository;
import com.swrd1337.sokudo.api.repositories.BoardsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BoardsService {

  @Autowired
  private BoardsRepository boardsRepository;

  @Autowired
  private ApiRepoRepository apiRepoRepository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  public Board updateBoard(Long boardId, Board newBoard) throws NotFoundException {
    return boardsRepository.findById(boardId).map(
        board -> {
          board.setName(newBoard.getName());
          board.setBoardColumns(newBoard.getBoardColumns());
          return boardsRepository.save(board);
        }).orElseThrow(NotFoundException::new);
  }

  public void deleteBoard(Long boardId) {
    boardsRepository.findById(boardId).ifPresent(
        board -> {
          apiRepoRepository.findById(board.getRepoDataId()).ifPresent(
              apiRepo -> {
                if (apiRepo.getBoards().size() > 1) {
                  apiRepo.getBoards().remove(board);
                  apiRepoRepository.save(apiRepo);
                }
              });
          boardsRepository.delete(board);
        });
  }

  public Board createBoard(String title, Long repoId) {
    Set<String> defaultCols = new LinkedHashSet<String>(){{
      add(ApiRepoService.TO_DO_COL_NAME);
      add(ApiRepoService.DOING_COL_NAME);
      add(ApiRepoService.DONE_COL_NAME);
    }};

    Board board = new Board(title, defaultCols, ApiRepoService.DONE_COL_NAME, repoId);
    board.setId(sequenceGeneratorService.generateSequence(Board.SEQUENCE_NAME));
    final Board newBoard = boardsRepository.save(board);

    apiRepoRepository.findById(repoId).ifPresent(
      repoData -> {
        repoData.getBoards().add(0, newBoard);;
        apiRepoRepository.save(repoData);
      }
    );

    return newBoard;
  }
}
