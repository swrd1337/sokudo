package com.swrd1337.sokudo.api.services;

import java.util.List;

import com.swrd1337.sokudo.api.entities.Task;
import com.swrd1337.sokudo.api.repositories.TasksRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TasksService {
  
  @Autowired
  private TasksRepository tasksRepository;

  @Autowired
  private SequenceGeneratorService sequenceGeneratorService;

  public Task saveTask(Task task) {
    Task newTask = new Task(
        task.getTitle(),
        task.getDescription(),
        task.getRepositoryDataId(),
        task.getColumnName()
    );
    newTask.setId(sequenceGeneratorService.generateSequence(Task.SEQUENCE_NAME));
    return tasksRepository.save(newTask);
  }

  public List<Task> getAllTasks(Long repoDataId) {
    return tasksRepository.findAllByRepositoryDataId(repoDataId);
  }

  public Task updateTask(Long taskId, Task task) throws NotFoundException {
    return tasksRepository.findById(taskId)
        .map(
            existingTask -> {
              existingTask.setTitle(task.getTitle());
              existingTask.setDescription(task.getDescription());
              existingTask.setColumnName(task.getColumnName());
              existingTask.setType(task.getType());
              existingTask.setStoryPoints(existingTask.getStoryPoints());
              return tasksRepository.save(existingTask);
            })
        .orElseThrow(NotFoundException::new);
  }

  public void deleteTask(Long taskId) {
    tasksRepository.deleteById(taskId);
  }

}
