package com.swrd1337.sokudo.api.entities;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import com.swrd1337.sokudo.utilities.tasks.TaskTypes;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

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
  public static final String SEQUENCE_NAME = "repo_data_sequence";

  @Id
  private long id;
  
  private String title;

  private String description;

  private long repositoryDataId;

  private String columnName;

  private TaskTypes type = TaskTypes.OTHER;

  private int storyPoints = 0;
  
  @DBRef
  private List<Comment> comments = Collections.emptyList();

  public Task(String title, String description, long repositoryDataId, String columnName) {
    this.title = title;
    this.description = description;
    this.repositoryDataId = repositoryDataId;
    this.columnName = columnName;
  }

}
