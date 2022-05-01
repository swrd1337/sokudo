package com.swrd1337.sokudo.api.services;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Comment;
import com.swrd1337.sokudo.api.entities.Task;
import com.swrd1337.sokudo.api.entities.User;
import com.swrd1337.sokudo.api.repositories.CommentsRepository;
import com.swrd1337.sokudo.api.repositories.TasksRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CommentsService {
  
  @Autowired
  private CommentsRepository commentsRepository;
  
  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  @Autowired
  private TasksRepository tasksRepository;

  public List<Comment> getCommentsByTaskId(Long taskId) throws NotFoundException {
    Task task = tasksRepository.findById(taskId)
        .orElseThrow(NotFoundException::new);
        System.out.println(task);
    return task.getComments();
  }

  public Comment saveComment(Comment comment, User user) {
    long taskId = comment.getTaskId();
    Long id = sequenceGeneratorService.generateSequence(Comment.SEQUENCE_NAME);

    Comment newComment = new Comment();
    newComment.setId(id);
    newComment.setUserId(user.getId());
    newComment.setAvatarUrl(user.getAvatarUrl());
    newComment.setUsername(user.getUsername());
    newComment.setTaskId(taskId);
    newComment.setContent(comment.getContent());

    tasksRepository.findById(taskId).ifPresent(task -> {
      task.getComments().add(newComment);
      tasksRepository.save(task);
    });

    return commentsRepository.save(newComment);
  }

  public void deleteComment(Long commentId) {
    commentsRepository.findById(commentId).ifPresent(comment -> {
      tasksRepository.findById(comment.getTaskId()).ifPresent(task -> {
        task.getComments().remove(comment);
        tasksRepository.save(task);
      });
      commentsRepository.delete(comment);
    });
  }

}
