package com.swrd1337.sokudo.api.controllers;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Task;
import com.swrd1337.sokudo.api.services.TasksService;
import com.swrd1337.sokudo.utilities.GsonWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/repositories/tasks")
public class TasksController {
  
  @Autowired
  private TasksService tasksService;

  @GetMapping(value = "/{repoDataId}")
  public ResponseEntity<List<Task>> getAllRepositoryTasks(@PathVariable Long repoDataId) {
    List<Task> tasks = tasksService.getAllTasks(repoDataId);
    if (tasks == null) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(tasks, HttpStatus.OK);
  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Task> saveTask(@RequestBody Task task) {
    Task savedTask = tasksService.saveTask(task);
    return new ResponseEntity<>(savedTask, HttpStatus.OK);
  } 

  @PutMapping(value = "/{taskId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) throws NotFoundException {
    Task updatedTask = tasksService.updateTask(taskId, task);
    return new ResponseEntity<>(updatedTask, HttpStatus.OK);
  } 

  @DeleteMapping(value = "/{taskId}")
  public void daleteTask(@PathVariable Long taskId) throws NotFoundException {
    tasksService.deleteTask(taskId);
  } 

}