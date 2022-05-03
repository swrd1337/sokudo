package com.swrd1337.sokudo.api.services;

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

  private ApiRepoRepository apiRepoRepository;

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
        });
  }
}
