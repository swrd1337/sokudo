package com.swrd1337.sokudo.api.controllers;

import java.util.List;

import com.swrd1337.sokudo.api.configuration.ApiAuthenticationToken;
import com.swrd1337.sokudo.api.entities.Comment;
import com.swrd1337.sokudo.api.entities.User;
import com.swrd1337.sokudo.api.services.AuthTokenService;
import com.swrd1337.sokudo.api.services.CommentsService;
import com.swrd1337.sokudo.api.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class CommentsController {
  
  @Autowired
  private AuthTokenService authTokenService;

  @Autowired
  private UserService userService;

  @Autowired
  private CommentsService commentsService;

  @GetMapping("/task/{taskId}")
  public ResponseEntity<List<Comment>> getAllComments(@PathVariable Long taskId) throws NotFoundException {
    List<Comment> comments = commentsService.getCommentsByTaskId(taskId);
    return new ResponseEntity<>(comments, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Comment> createComment(@RequestBody Comment comment, ApiAuthenticationToken principal) throws NotFoundException {
    Long userId = authTokenService.getUserIdFromAuthToken(principal);
    User user = userService.getUser(userId);
    Comment savedComment = commentsService.saveComment(comment, user);
    return new ResponseEntity<>(savedComment, HttpStatus.OK);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, ApiAuthenticationToken principal) {
    Long userId = authTokenService.getUserIdFromAuthToken(principal);
    commentsService.deleteComment(commentId, userId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
