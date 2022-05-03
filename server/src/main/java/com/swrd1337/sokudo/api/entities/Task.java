package com.swrd1337.sokudo.api.entities;

import java.util.ArrayList;
import java.util.List;

import com.swrd1337.sokudo.utilities.tasks.TaskTypes;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
  
  @Transient
  public static final String SEQUENCE_NAME = "task_sequence";

  @Id
  private long id;
  
  private String title;

  private String description;

  private long boardId;

  private String columnName;

  private String author;

  private TaskTypes type = TaskTypes.OTHER;

  private int storyPoints = 0;

  @DBRef
  private List<Comment> comments;

  public Task(String title, String description, long boardId, String columnName, String author) {
    this.title = title;
    this.description = description;
    this.boardId = boardId;
    this.columnName = columnName;
    this.author = author;
    this.comments = new ArrayList<>();
  }

}
