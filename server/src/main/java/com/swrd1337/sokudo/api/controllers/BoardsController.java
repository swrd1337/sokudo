package com.swrd1337.sokudo.api.controllers;

import com.swrd1337.sokudo.api.entities.Board;
import com.swrd1337.sokudo.api.services.BoardsService;
import com.swrd1337.sokudo.utilities.GsonWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/boards")
public class BoardsController {
  
  @Autowired
  private BoardsService boardsService;

  @PostMapping
  public ResponseEntity<Board> createBoard(@RequestParam String title, @RequestParam Long repoId) throws NotFoundException {
    Board board = boardsService.createBoard(title, repoId);
    return new ResponseEntity<>(board, HttpStatus.OK);
  }

  @PutMapping(value = "/{boardId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Board> updateBoard(@PathVariable Long boardId, @RequestBody String json) throws NotFoundException {
    Board board = GsonWrapper.getGson().fromJson(json, Board.class);
    Board updatedBoard = boardsService.updateBoard(boardId, board);
    return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
  }
  
  @DeleteMapping("/{boardId}")
  public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) throws NotFoundException {
    boardsService.deleteBoard(boardId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
