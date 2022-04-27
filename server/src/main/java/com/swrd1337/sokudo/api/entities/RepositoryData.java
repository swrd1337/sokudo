package com.swrd1337.sokudo.api.entities;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "repository_data")
public class RepositoryData {

  @Transient
  public static final String SEQUENCE_NAME = "repo_data_sequence";

  @Id
  private long id;

  private String ownerName;

  private String repoName;

  private String defaultBranch;

  private String visibility;

  private Set<String> boardColumns;

  private int doneColumnIndex;

  public RepositoryData(String ownerName, String name, String defaultBranch, String visibility,
      Set<String> boardColumns, int doneColumnIndex) {
    this.ownerName = ownerName;
    this.repoName = name;
    this.defaultBranch = defaultBranch;
    this.visibility = visibility;
    this.boardColumns = boardColumns;
    this.doneColumnIndex = doneColumnIndex;
  }

}
